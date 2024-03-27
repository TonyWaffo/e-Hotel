import { useState } from 'react';
import "./ProfilePage.css";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { FaWindowClose } from "react-icons/fa";


function Profile({visibility,setProfileSectionVisibility}) {
    const[signInSection,showSignInSection]=useState(true);


    const handleLogin = () => {
      console.log("logged in");
    }
  
    return (
      <>
            <div className={(visibility === true) ? 'profile-section visible' : 'profile-section hidden'}>
              <div className='icon-container'>
              <FaWindowClose onClick={() => setProfileSectionVisibility(false)} size={40} style={{cursor:'pointer'}}   />
              </div>

                {signInSection === true && <div className='profile'>
                  <SignIn showSignInSection={showSignInSection} />
                  </div>
                }
                {signInSection !== true && <div className='profile'>
                  <SignUp showSignInSection={showSignInSection}/>
                  </div>
                }
            </div>
      </>
    );
  }
  
  export default Profile;