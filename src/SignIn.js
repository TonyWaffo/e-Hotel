import './App.css';
import { useContext, useState } from 'react';
import './ProfilePage.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { profileContext } from './App';



function SignIn({showSignInSection}) {
  const {visibility,setVisibility}=useContext(profileContext);

  const navigate=useNavigate();

  const handleLogin = () => {

    //if succes
    if (visibility.userType=="employee"){
      setVisibility({isVisible:false,userType:""});
      //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
      navigate('/dashboard'); 

    }
    setVisibility({isVisible:false,userType:""});
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
