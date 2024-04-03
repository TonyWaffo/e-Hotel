import './App.css';
import { useContext,useState,useRef } from 'react';
import './ProfilePage.css';
import { CgProfile } from "react-icons/cg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { profileContext } from './App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";



function SignUp({showSignInSection}) {

  const nameRef=useRef(null);
  const nasRef=useRef(null);
  const phoneRef=useRef(null);
  const addressRef=useRef(null);

  const [registrationError,setRegistrationError]=useState({error:false,message:""});

  const navigate = useNavigate();
  const {visibility,setVisibility}=useContext(profileContext);

  const handleRegistration = async () => {
    const name = nameRef.current.value;
    const nas = nasRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;

    if (name !== "" && nas !== "" && phone !== "" && address !== "") {
      
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          name,
          nas,
          phone,
          address
        });

        console.log("Employee Account created successfully:", response.data);
        
        if (response.data.length == 0) {
          setRegistrationError({ error: true, message: " No user found" });
        } else {

          if (visibility.userType == "client") {
            setVisibility(prevState => ({ ...prevState, isVisible: false, canUpdateMain: true }));
            navigate('/', { state: {} })
          } else if (visibility.userType == "employee") {
            setVisibility(prevState => ({ ...prevState, isVisible: false, canUpdateMain: true }));
            navigate('/', { state: {} })
          }
          else {
            setVisibility(prevState => ({ ...prevState, isVisible: false, canUpdateMain: true }));
            //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
            navigate('/dashboard');
          }

          setRegistrationError({ error: false, message: "" });
        }
        
      } catch (error) {
        console.log("error creating employee account:", error);
      }
      console.log("employee data:", { name, nas });
    } else {
      setRegistrationError({ error: true, message: " Fill all inputs" });
    };
  }

  return (
    <>
      <div className='profile'>
          <CgProfile size={50} color="white"/>
          <h1>Sign Up</h1>
        <div>
          <Form className='authentication-form'>
            <Form.Group className="form-group" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} name="name" placeholder="First name & last Name" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicNas">
              <Form.Label>Nas</Form.Label>
              <Form.Control type="text" ref={nasRef} name="nas" placeholder="XXX XXX XXX" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="number"ref={phoneRef} name="phone" placeholder="10 digits phone number" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" ref={addressRef} name="address" placeholder=" Street number, city, Country" />
            </Form.Group>

            {registrationError.error && <span className='input-error'><ImCross size={20} /> {registrationError.message}</span>}


            <Button variant="dark" className="btn mt-4" type="button" name="login" onClick={handleRegistration}>
              Create account
            </Button>
            <span >Already have an account, <Link onClick={()=>showSignInSection(true)} >Sign in</Link></span>

          </Form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
