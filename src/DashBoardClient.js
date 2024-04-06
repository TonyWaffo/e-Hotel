import './App.css';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css';
import { useRef,useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function DashboardClient() {

    const [allClients,setAllClients]=useState([]) ;

    // reference the inputs relative to creation
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const nasRef = useRef(null);

    // reference the inputs relative to update
    const nameRef2 = useRef(null);
    const addressRef2 = useRef(null);
    const phoneNumberRef2 = useRef(null);
    const nasRef2 = useRef(null);
    const clientIdRef = useRef(null);

    // reference the inputs relative to deletion
    const clientIdRef2 = useRef(null);

    //create account
    const handleAccountCreation = async () => {
        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const nas = nasRef.current.value;
        if (name !== "" && address !== "" && phoneNumber !== "" && nas !== "") {
            try {
                const response = await axios.post('http://localhost:5000/dashboard_create_client_account', {
                    name,
                    address,
                    phoneNumber,
                    nas,
                });

                console.log("Account created successfully:", response.data);
            } catch (error) {
                console.log("error creating client account:", error);
            }
        } else {
            console.error("Fill inputs for creating client account")
        };

    }

    //delete account
    const handleAccountDeletion = async () => {
        const clientId = clientIdRef2.current.value;
        if (clientId !== "") {
            try {
                const response = await axios.delete(`http://localhost:5000/delete_client/${clientId}`);

                console.log("Account deleted successfully:", response.data);
            } catch (error) {
                console.error("Error deleting client account:", error);
            }
        } else {
            console.error("fill inputs for deleting client account");
        }
    }

    //update account
    const handleAccountUpdate = async () => {
        const clientId = clientIdRef.current.value;
        const name = nameRef2.current.value;
        const address = addressRef2.current.value;
        const phoneNumber = phoneNumberRef2.current.value;
        const nas = nasRef2.current.value;
        if (clientId !== "") {
            try {
                const response = await axios.put(`http://localhost:5000/dashboard_update_client_account/${clientId}`, {
                    name,
                    address,
                    phoneNumber,
                    nas,
                });

                console.log("Account updated successfully:", response.data);
            } catch (error) {
                console.log("error updating client data:", error);
            }
        } else {
            console.error("fill client id input");
        }
    }

    //view all clients
    const viewAllClients = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard_view_clients_account');

            console.log("All clients:", response.data);
            setAllClients(response.data);
        } catch (error) {
            console.log("error Fetching clients:", error);
        }
    }

    return (
        <>
            <div className='mainpage-body-subcontainer'>

                <Form >
                    <h3>Client section</h3>

                    <h4>Create client account</h4>
                    <div className='form-row '>
                        <Form.Group className="form-group" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} placeholder="Enter full name" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" ref={addressRef} name="address" placeholder="Street, Street number, City, Province, Country" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" ref={phoneNumberRef} name="phoneNumber" placeholder="Tel" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicNas">
                            <Form.Label>NAS</Form.Label>
                            <Form.Control type="text" ref={nasRef} name="nas" placeholder="XXX XXX XXX" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="create" onClick={() => handleAccountCreation()} >
                        Create account
                    </Button>

                    <h4>Update Client accout</h4>
                    <div className='form-row'>

                        <Form.Group className="form-group" controlId="formBasicClientId">
                            <Form.Label>Client Id</Form.Label>
                            <Form.Control type="text" ref={clientIdRef} name="clientId" placeholder="#clientId" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef2} name="name" placeholder="Enter full name" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" ref={addressRef2} name="address" placeholder="Street, Street number, City, Province, Country" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" ref={phoneNumberRef2} name="phoneNumber" placeholder="Tel" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicNas">
                            <Form.Label>NAS</Form.Label>
                            <Form.Control type="text" ref={nasRef2} name="nas" placeholder="XXX XXX XXX" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="update" onClick={() => handleAccountUpdate()}>
                        Update account
                    </Button>

                    <h4>Remove Client</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicClientId">
                            <Form.Label>Client Id</Form.Label>
                            <Form.Control type="text" ref={clientIdRef2} name="clientId" placeholder="#clientId" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="delete" onClick={() => handleAccountDeletion()}>
                        Remove client
                    </Button>
                    <Button variant="dark" className="btn mb-4" type="button" name="viewClients" onClick={() => viewAllClients()} style={{ position: "absolute", right: "0", bottom: "0" }} >
                        See all clients
                    </Button>

                    <ul>
                    {allClients.map((client)=>{
                        return  <li>{client.client_id}, {client.nom} </li>
                    })}
                    </ul>
                </Form>
            </div>

        </>
    );
}

export default DashboardClient;
