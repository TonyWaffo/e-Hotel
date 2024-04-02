import './App.css';
import { useState,useRef } from 'react';
import Banner from './Banner';
import './RoomPage.css';
import Room from './Room';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import { MdOutlineWarningAmber } from "react-icons/md";
import axios from 'axios';

function RoomPage() {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [cardError,setCardError]=useState(false);
    const [modalShow, setModalShow] = useState(false);

    const nameOnCardRef=useRef("nameOnCard");
    const cardNumberRef=useRef("cardNumber");
    const expiryDateRef=useRef("");
    const cvcRef=useRef("");

    //get access to the queryResult send by the main page
    const location=useLocation();

    //list of all rooms available
    let availableRooms=location.state?.availableRooms || [];

    let roomFromReservation=location.state?.roomFromReservation || [];

    const reservation=location.state.reservation;

    const role=location.state.role;

    let selectedData;
    if(role=="client"){
        //selectedData=;
    }else{
        //selectedData=;
    }
     //check validity of the credit card entered
    const checkCreditCard=()=>{
        if(nameOnCardRef.current.value.trim() === ""){
            console.log("name on card error");
            return false;
        }
        if(expiryDateRef.current.value.trim() === ""){
            console.log("expiry date error");
            return false;
        }
        if(!cardNumberRef.current.value.trim().match(/^(\d{4}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4})$/)){
            console.log("card number error");
            return false;
        }
        if(!cvcRef.current.value.trim().match(/^(\d{3})$/)){
            console.log("cvc error");
            return false;
        }
        return true
    }

    const handleInputChange=()=>{
        return;
    }


    //Create rental
    const createRental= async ()=>{
        if(checkCreditCard()){
            //Create a rental  ia the backend
            setCardError(false);
            setModalShow(true);

            //proccess data
            try {
                const response = await axios.post('localhost/create_rental', selectedRoom);
                console.log(response.data);
                //setModalShow(true);
              } catch (error) {
                console.log("error creating rental:", error);
              }
            //reset all the forms of the website 
        }else{
            setCardError(true);
        };
    }


    //create reservation
    const createReservation= async()=>{
        if (selectedRoom!=null) {

            try {
              const response = await axios.post('/create_reservation', selectedRoom);
              //the response should include the reservation id
              console.log(response.data);
              //setModalShow(true);
            } catch (error) {
              console.log("error creating reservation:", error);
            }
            setModalShow(true);
            console.log(selectedRoom);
          } else {
            console.error("replace this by a condition if needed");
          };
    }

    return (
        <>
            <Banner />
            <section>
                <div className='rooms-container'>
                    <div>
                        <h2>Available rooms</h2>
                    </div>
                    <Form >

                        {reservation==true && availableRooms.map((room) => {
                            return <Room key={room.id} room={room} isSelected={selectedRoom==room} onSelect={() => setSelectedRoom(room)} />
                        })}

                        {reservation==false && roomFromReservation.map((room) => {
                            return <Room key={room.id} room={room} isSelected={selectedRoom==room} onSelect={() => setSelectedRoom(room)} />
                        })}

                        {role=="client" && 
                        <Button variant="primary" className="btn mt-4" type="button" name="submit" onClick={createReservation}>
                            Reserve room
                        </Button>}

                        {/* Set the payment form for the employee */}
                        
                        {role != "client" &&
                            <div className='container mt-4 payment' style={{ maxWidth: '800px' }}>
                                <div>
                                    <h1>Payment</h1>
                                    <Form.Group className="mb-3" controlId="formBasicNameOnCard">
                                        <Form.Label>Name on Card</Form.Label>
                                        <Form.Control type="text" ref={nameOnCardRef} name="nameOnCard" onChange={handleInputChange} placeholder="Enter name on card" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCardNumber">
                                        <Form.Label>Card number</Form.Label>
                                        <Form.Control type="number" ref={cardNumberRef} name="cardNumber" onChange={handleInputChange} placeholder="---- ---- ---- ----" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicDate">
                                        <Form.Label>Expiry date</Form.Label>
                                        <Form.Control type="month" ref={expiryDateRef} name="expiryDate" onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCvc">
                                        <Form.Label>CVC</Form.Label>
                                        <Form.Control type="number" ref={cvcRef} name="cvc" onChange={handleInputChange} placeholder="Enter the 3-dgits CVC" />
                                    </Form.Group>

                                    <Button variant="primary" className="btn mt-4 mb-2" type="button" name="submit" onClick={createRental}>
                                        Create rental
                                    </Button>
                                </div>
                                {cardError && <span className='card-error'><MdOutlineWarningAmber size={30} />Credit card error</span>}
                            </div>}
                    </Form>
                </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    details={selectedRoom}
                />
            </section>
        </>
    );
}

export default RoomPage;
