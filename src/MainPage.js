import './App.css';
import { useState } from 'react';
import Banner from './Banner';
import './MainPage.css';
import MainPageClient from './MainPageClient';
import MainPageEmployee from './MainPageEmployee';


function MainPage({role,updateSection}) {
  //const [role,setRole]=useState("employee");
  return (
    <>
      <Banner />
      <section>
        <div className='container intro'>
          <h1>Our Hotels</h1>
          <p>Embark on an unforgettable journey of luxury and comfort. Indulge in exquisite experiences and create lasting memories. Welcome to our hotel, where every moment promises adventure and discovery.</p>
        </div>
        {(role=="client" && updateSection==true) && <MainPageClient role={role}/>}
        {(role!="client" && updateSection==true) && <MainPageEmployee role={role}/>}

      </section>
      </>
  );
}

export default MainPage;
