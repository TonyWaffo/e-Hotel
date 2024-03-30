import './App.css';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function DashboardHotel() {
    return (
        <>
            <div className='mainpage-body-subcontainer'>
            <Form >
                    <h3>Hotel section</h3>

                    <h4>Update hotel info</h4>
                    <div className='form-row'>
                    <Form.Group className="form-group" controlId="formBasicHotelId">
                            <Form.Label>Hotel ID</Form.Label>
                            <Form.Control type="text" name="hotelId" placeholder="#hotelID" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Street, Street number, City, Province, Country" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" name="phoneNumber" placeholder="Tel" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="email@email.com" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control type="number" name="class" placeholder="Number of stars" />
                        </Form.Group>

                        
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" >
                        Update info
                    </Button>
                    <Button variant="dark" className="btn mb-4" type="button" name="submit"  style={{position:"absolute",right:"0",bottom:"0"}} >
                        See all hotels
                    </Button>
                    
                </Form>
            </div>

        </>
    );
}

export default DashboardHotel;
