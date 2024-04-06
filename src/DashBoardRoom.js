import './App.css';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css';
import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function DashboardRoom() {

    const [allRooms, setAllRooms] = useState([]);

    // reference the inputs relative to creation
    const roomIdRef = useRef(null);
    const issuesRef = useRef(null);
    const viewRef = useRef(null);
    const commodityRef = useRef(null);

    // reference the inputs relative to creation
    const roomIdRef2 = useRef(null);
    const issuesRef2 = useRef(null);
    const viewRef2 = useRef(null);
    const commodityRef2 = useRef(null);

    // reference the inputs relative to creation
    const roomIdRef3 = useRef(null);

    //create room
    const handleRoomCreation = async () => {
        const roomId = roomIdRef.current.value;
        const issues = issuesRef.current.value;
        const view = viewRef.current.value;
        const commodity = commodityRef.current.value;
        if (roomId !== "" && issues !== "" && view !== "" && commodity !== "") {
            try {
                const response = await axios.post('http://localhost:5000/dashboard_create_room', {
                    roomId,
                    issues,
                    view,
                    commodity,
                });

                console.log("Room created successfully:", response.data);
            } catch (error) {
                console.log("error creating room:", error);
            }
            console.log("room data:", { roomId, issues, view, commodity });
        } else {
            console.error("Fill inputs for creating room")
        };

    }

    //delete room
    const handleRoomDeletion = async () => {
        const roomId = roomIdRef3.current.value;
        if (roomId !== "") {
            try {
                const response = await axios.delete(`http://localhost:5000/delete_room/${roomId}`);

                console.log("Room deleted successfully:", response.data);
            } catch (error) {
                console.error("Error deleting room:", error);
            }

            console.log("room data:", roomId);
        } else {
            console.error("fill inputs for deleting room");
        }
    }

    //update room
    const handleRoomUpdate = async () => {
        const roomId = roomIdRef2.current.value;
        const issues = issuesRef2.current.value;
        const view = viewRef2.current.value;
        const commodity = commodityRef2.current.value;
        console.log(commodityRef2.current.value);
        if(roomId!=""){
            try {
                const response = await axios.put(`http://localhost:5000/dashboard_update_room/${roomId}`, {
                    issues,
                    view,
                    commodity,
                });
    
                console.log("Room updated successfully:", response.data);
            } catch (error) {
                console.log("error updating room:", error);
            };
        }else{
            console.log("Fill room id input");
        }
    }

    //view all rooms
    const viewAllRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard_view_rooms');

            console.log("All rooms:", response.data);
            setAllRooms(response.data);
        } catch (error) {
            console.log("error Fetching rooms:", error);
        }

    }

    return (
        <>
            <div className='mainpage-body-subcontainer'>
                <Form >
                    <h3>Room section</h3>

                    <h4>Add room in the hotel</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicRoomId">
                            <Form.Label>Room number</Form.Label>
                            <Form.Control type="text" ref={roomIdRef} name="roomId" placeholder="#roomID" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicIssues">
                            <Form.Label>Issues</Form.Label>
                            <Form.Control type="text" ref={issuesRef} name="issues" placeholder="ex. air conditioner problem" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicView">
                            <Form.Label>View</Form.Label>
                            <Form.Control type="text" ref={viewRef} name="view" placeholder="ex. View on the sea" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicCommodity">
                            <Form.Label>Commodity</Form.Label>
                            <Form.Control type="text" ref={commodityRef} name="commodity" placeholder="Commodity" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" onClick={() => handleRoomCreation()}>
                        Add room
                    </Button>

                    <h4>Update a room in the hotel</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicRoomId">
                            <Form.Label>Room number</Form.Label>
                            <Form.Control type="text" ref={roomIdRef2} name="roomId" placeholder="#roomID" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicIssues">
                            <Form.Label>Issues</Form.Label>
                            <Form.Control type="text" ref={issuesRef2} name="issues" placeholder="ex. air conditioner problem" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicView">
                            <Form.Label>View</Form.Label>
                            <Form.Control type="text" ref={viewRef2} name="view" placeholder="ex. View on the sea" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicCommodity">
                            <Form.Label>Commodity</Form.Label>
                            <Form.Control type="text" ref={commodityRef2} name="commodity" placeholder="Commodity" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" onClick={() => handleRoomUpdate()} >
                        Update room
                    </Button>

                    <h4>Remove a room from the hotel</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicRoomId">
                            <Form.Label>Room Id</Form.Label>
                            <Form.Control type="text" ref={roomIdRef3} name="roomId" placeholder="#roomId" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" onClick={() => handleRoomDeletion()} >
                        Remove room
                    </Button>
                    <Button variant="dark" className="btn mb-4" type="button" name="submit" onClick={() => viewAllRooms()} style={{ position: "absolute", right: "0", bottom: "0" }}>
                        See all rooms
                    </Button>
                    <ul>
                        {allRooms.map((room) => {
                            return <li>{room.chambre_id} - {room.prix}$ </li>
                        })}
                    </ul>
                </Form>
            </div>

        </>
    );
}

export default DashboardRoom;
