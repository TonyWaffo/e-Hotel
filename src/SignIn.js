import './App.css';
import { useContext, useState } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { profileContext } from './App';
import axios from 'axios';



function SignIn({showSignInSection}) {
  const {visibility,setVisibility}=useContext(profileContext);

  const navigate=useNavigate();

  const handleLogin = async () => {
    /*

    if (name !== "" && address !== "" && phoneNumber !== "" && nas !== "" && role!== "") {
      try {
          const response = await axios.post('localhost/dashboard_create_employee_account', {
              name,
              address,
              phoneNumber,
              nas,
              role,
          });

          console.log("Employee Account created successfully:", response.data);
      } catch (error) {
          console.log("error creating employee account:", error);
      }
      console.log("employee data:", { name, address, phoneNumber, nas,role });
  } else {
      console.error("Fill inputs for creating employee account")
  };
  */

    //if success

    if (visibility.userType=="client" || visibility.userType=="employee" ){
      setVisibility(prevState=>({...prevState,isVisible:false,canUpdateMain:true}));
      navigate('/')
    }else{
      setVisibility(prevState=>({...prevState,isVisible:false,canUpdateMain:true}));
      //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
      navigate('/dashboard'); 

    }
  }


  return (
    <>
      
      <div className='profile'>
        <div className='container title'>
          <CgProfile size={50} color="white"/>
          <h1>Sign in</h1> 
        </div>
        <div>
          <Form className='authentication-form' >
            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="email@email.com" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="email@email.com" />
            </Form.Group>

            <Button variant="dark" className="btn mt-4" type="button" name="login" onClick={handleLogin}>
              Login
            </Button>
            {visibility.userType=="client" &&
              <span>Don't have an account, <Link onClick={()=>showSignInSection(false)}>Create one</Link></span>
            }

          </Form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
