import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { useEffect,useState, useRef,createContext } from 'react';
import './App.css';
import MainPage from './MainPage';
import Header from './Header';
import RoomPage from './RoomPage'


export const bannerContext=createContext();

function App() {
  //set is the banner is visible or not
  const [isBannerVisible,setBannerVisble]=useState(true);
  
  //hold a reference to the banner component
  const bannerRef=useRef(null);


  //run everytime
  useEffect(()=>{
    const handleScroll=()=>{
      if(bannerRef.current){
        //take the bounding rectangle of the banner component
        const bannerRect=bannerRef.current.getBoundingClientRect();
        setBannerVisble(!(bannerRect.bottom -70<=0 ))

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
        <Header isTransparent={isBannerVisible} />
        <bannerContext.Provider value={bannerRef}>
          <Routes>
            <Route path="/" Component={MainPage}/>
            <Route path="/rooms" Component={RoomPage}/>
          </Routes>
        </bannerContext.Provider>

      </div>
    </Router>

  );
}

export default App;
