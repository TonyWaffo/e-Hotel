import './App.css';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function DashboardRoom() {
    return (
        <>
            <div className='mainpage-body-subcontainer'>
            <Form >
                    <h3>Room section</h3>

                    <h4>Add room in the hotel</h4>
                    <div className='form-row'>
                    <Form.Group className="form-group" controlId="formBasicRoomId">
                            <Form.Label>Room number</Form.Label>
                            <Form.Control type="text" name="roomId" placeholder="#roomID" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicIssues">
                            <Form.Label>Issues</Form.Label>
                            <Form.Control type="text" name="issues" placeholder="ex. air conditioner problem" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicView">
                            <Form.Label>View</Form.Label>
                            <Form.Control type="text" name="view" placeholder="ex. View on the sea" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicCommodity">
                            <Form.Label>Commodity</Form.Label>
                            <Form.Control type="text" name="commodity" placeholder="Commodity" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" >
                        Add room
                    </Button>

                    <h4>Update a room in the hotel</h4>
                    <div className='form-row'>
                    <Form.Group className="form-group" controlId="formBasicRoomId">
                            <Form.Label>Room number</Form.Label>
                            <Form.Control type="text" name="roomId" placeholder="#roomID" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicIssues">
                            <Form.Label>Issues</Form.Label>
                            <Form.Control type="text" name="issues" placeholder="ex. air conditioner problem" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicView">
                            <Form.Label>View</Form.Label>
                            <Form.Control type="text" name="view" placeholder="ex. View on the sea" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicCommodity">
                            <Form.Label>Commodity</Form.Label>
                            <Form.Control type="text" name="commodity" placeholder="Commodity" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" >
                        Update room
                    </Button>

                    <h4>Remove a room from the hotel</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicRoomId">
                            <Form.Label>Room Id</Form.Label>
                            <Form.Control type="text" name="roomId" placeholder="#roomId" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" >
                        Remove room
                    </Button>
                    <Button variant="dark" className="btn mb-4" type="button" name="submit"  style={{position:"absolute",right:"0",bottom:"0"}}>
                        See all rooms
                    </Button>
                </Form>
            </div>

        </>
    );
}

export default DashboardRoom;
