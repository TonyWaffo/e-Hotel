import { useState } from 'react';
import "./ProfilePage.css";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { FaWindowClose } from "react-icons/fa";


function Profile({visibility,setVisibility}) {
    const[signInSection,showSignInSection]=useState(true);


    const handleLogin = () => {
      console.log("logged in");
    }
  
    return (
      <>
            <div className={(visibility.isVisible === true) ? 'profile-section visible' : 'profile-section hidden'}>
              <div className='icon-container'>
              <FaWindowClose onClick={() => {setVisibility({ isVisible: false, userType: "" });showSignInSection(true)}} size={40} style={{cursor:'pointer'}}   />
              </div>

                {signInSection === true && <div className='profile'>
                  <SignIn showSignInSection={showSignInSection} />
                  </div>
                }
                {(signInSection !== true && visibility.userType=="client") && <div className='profile'>
                  <SignUp showSignInSection={showSignInSection}/>
                  </div>
                }
            </div>
      </>
    );
  }
  
  export default Profile;