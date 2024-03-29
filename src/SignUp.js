import './App.css';
import { useContext,useState } from 'react';
import './ProfilePage.css';
import { CgProfile } from "react-icons/cg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { profileContext } from './App';



function SignUp({showSignInSection}) {

  const {setVisibility}=useContext(profileContext);

  const handleRegistration = () => {
    setVisibility({isVisible:false,userType:""});
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
              <Form.Control type="text" name="name" placeholder="First name & last Name" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="email@email.com" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicNas">
              <Form.Label>Nas</Form.Label>
              <Form.Control type="text" name="nas" placeholder="XXX XXX XXX" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="number" name="phone" placeholder="10 digits phone number" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder=" Use a strong password" />
            </Form.Group>

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
