import './App.css';
import { useState } from 'react';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DashboardRoom from './DashBoardRoom';
import DashboardClient from './DashBoardClient';
import DashboardEmployee from './DashBoardEmployee';
import DashboardHotel from './DashBoardHotel';



function Dashboard() {

    return (
        <>
            <Banner />
            <section className='dashboard'>
                <div className='container intro'>
                    <h1>Dashboard</h1>
                </div>
                <div className='mainpage-body'>
                    <div>
                        <h2>Take control</h2>
                    </div>
                    
                    <DashboardClient/>
                    <DashboardEmployee/>
                    <DashboardHotel/>
                    <DashboardRoom/>
                    
                </div>
            </section>
        </>
    );
}

export default Dashboard;
