import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { useEffect,useState, useRef,createContext } from 'react';
import './App.css';
import MainPage from './MainPage';
import Header from './Header';
import RoomPage from './RoomPage';
import Profile from './Profile';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';


export const bannerContext=createContext();
export const profileContext=createContext();

function App() {
  //set is the banner is visible or not
  const [isBannerVisible,setBannerVisible]=useState(true);

  //decide if we hide or unhide the profile section, set the type of user and judge if the main page can upload his 
  //content base on the user role
  const[profileSectionVisibility,setProfileSectionVisibility]=useState({isVisible:false,userType:"",canUpdateMain:true});
  
  //get the prevSate of the user profile
  //const [prevStateVisibility, setPrevStateVisibility] = useState({userType:"",canUpdateMain:true});
  //hold a reference to the banner component
  const bannerRef=useRef(null);


  //run everytime
  useEffect(()=>{
    const handleScroll=()=>{
      if(bannerRef.current){
        //take the bounding rectangle of the banner component
        const bannerRect=bannerRef.current.getBoundingClientRect();
        setBannerVisible(!(bannerRect.bottom -70<=0 ))
      }else{
        setBannerVisible(true);
      }
    }
    //triggers, when user scrolls
    window.addEventListener('scroll',handleScroll);

    //cleanup listener
    //return ()=>removeEventListener('scroll',handleScroll);
  },[])

  


  return (
    <Router>
      <div className="App">
        <Header isTransparent={isBannerVisible} setProfileSectionVisibility={setProfileSectionVisibility}/>
        <profileContext.Provider value={{visibility:profileSectionVisibility, setVisibility:setProfileSectionVisibility }}>
          <Profile visibility={profileSectionVisibility} setVisibility={setProfileSectionVisibility}/>
        </profileContext.Provider>
        
        <bannerContext.Provider value={bannerRef}>
          <Routes>
            <Route path="/" Component={() => <MainPage role={profileSectionVisibility.userType} updateSection={profileSectionVisibility.canUpdateMain} />}/>
            <Route path="/rooms" Component={RoomPage}/>
            <Route path="/dashboard" Component={Dashboard}/>
          </Routes>
        </bannerContext.Provider>

      </div>
    </Router>

  );
}

export default App;
