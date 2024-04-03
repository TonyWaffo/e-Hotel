import './App.css';
import { useContext, useState, useRef } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { profileContext } from './App';
import axios from 'axios';
import { ImCross } from "react-icons/im";



function SignIn({ showSignInSection }) {

  const nameRef = useRef(null);
  const nasRef = useRef(null);

  const [registrationError,setRegistrationError]=useState({error:false,message:""});

  const { visibility, setVisibility } = useContext(profileContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const name = nameRef.current.value;
    const nas = nasRef.current.value;

    let user=visibility.userType;

    if (name !== "" && nas !== "") {
      try {
        const response = await axios.get('http://localhost:5000/signin', { params: {
          name,
          nas,
          user,
        } });

        console.log("Response", response.data);

        if (Object.keys(response.data).length === 0) {
          setRegistrationError({ error: true, message: "No user found" });
        } else {
          if (user == "client") {
            setVisibility(prevState => ({ ...prevState, isVisible: false, canUpdateMain: true }));
            navigate('/', { state: {} })
          } else if (user == "employee") {
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
        //the response should include the the client id
        
      } catch (error) {
        console.log("error logging account:", error);
      }
      console.log("Logging credentials:", { name, nas });
    } else {
      setRegistrationError({ error: true, message: "Fill all inputs" });
    };
  }


  return (
    <>

      <div className='profile'>
        <div className='container title'>
          <CgProfile size={50} color="white" />
          <h1>Sign in</h1>
        </div>
        <div>
          <Form className='authentication-form' >
            <Form.Group className="form-group" controlId="formBasicFullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" ref={nameRef} name="name" placeholder="Full name" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicNas">
              <Form.Label>NAS</Form.Label>
              <Form.Control type="numeric" ref={nasRef} name="nas" placeholder="--- --- ---" />
            </Form.Group>

            {registrationError.error && <span className='input-error'><ImCross size={20} /> {registrationError.message}</span>}

            {visibility.userType == "client" &&
              <><Button variant="dark" className="btn mt-4" type="button" name="login" onClick={()=>handleLogin()}>
              Login
            </Button>
            <span>Don't have an account, <Link onClick={() => showSignInSection(false)}>Create one</Link></span>
            </>
            }

            {visibility.userType != "client" &&
              <Button variant="dark" className="btn mt-4" type="button" name="login" onClick={()=>handleLogin()}>
              Login
            </Button>
            }

          </Form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
