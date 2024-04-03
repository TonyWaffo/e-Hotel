import './App.css';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css'
import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function DashboardHotel() {
    // reference the inputs relative to update
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const classRef = useRef(null);
    const hotelIdRef = useRef(null);


    //update hotel
    const handleHotelUpdate = async () => {
        const hotelId = hotelIdRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const classHotel = classRef.current.value;
        if (hotelId !== "" && email !== "" && address !== "" && phoneNumber !== "" && classHotel !== "") {
            try {
                const response = await axios.put(`http://localhost:5000/dashboard_update_hotel/${hotelId}`, {
                    email,
                    address,
                    phoneNumber,
                    classHotel,
                });

                console.log("Hotel updated successfully:", response.data);
            } catch (error) {
                console.log("error updating hotel:", error);
            }
            console.log("Hotel data:", { hotelId, email, address, phoneNumber, classHotel });
        } else {
            console.error("Fill Hotel inputs to update");
        }
    }

    //view all hotels
    const viewAllHotels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard_view_hotels');

            console.log("All Hotels:", response.data);
        } catch (error) {
            console.log("error Fetching hotels:", error);
        }
    }

    return (
        <>
            <div className='mainpage-body-subcontainer'>
                <Form >
                    <h3>Hotel section</h3>

                    <h4>Update hotel info</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicHotelId">
                            <Form.Label>Hotel ID</Form.Label>
                            <Form.Control type="text" ref={hotelIdRef} name="hotelId" placeholder="#hotelID" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" ref={addressRef} name="address" placeholder="Street, Street number, City, Province, Country" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" ref={phoneNumberRef} name="phoneNumber" placeholder="Tel" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} name="email" placeholder="email@email.com" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control type="number" ref={classRef} name="class" placeholder="Number of stars" />
                        </Form.Group>


                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" onClick={() => handleHotelUpdate()} >
                        Update info
                    </Button>
                    <Button variant="dark" className="btn mb-4" type="button" name="submit" onClick={() => viewAllHotels()} style={{ position: "absolute", right: "0", bottom: "0" }} >
                        See all hotels
                    </Button>

                </Form>
            </div>

        </>
    );
}

export default DashboardHotel;
