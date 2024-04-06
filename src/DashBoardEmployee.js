import axios from 'axios';
import './App.css';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css';
import { useRef,useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function DashboardEmployee() {

    const [allEmployees,setAllEmployees]=useState([]) ;

    // reference the inputs relative to creation
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const nasRef = useRef(null);
    const roleRef=useRef(null);

    // reference the inputs relative to update
    const nameRef2 = useRef(null);
    const addressRef2 = useRef(null);
    const phoneNumberRef2 = useRef(null);
    const nasRef2 = useRef(null);
    const roleRef2=useRef(null);
    const employeeIdRef = useRef(null);

    // reference the inputs relative to deletion
    const employeeIdRef2 = useRef(null);

    //create account
    const handleAccountCreation = async () => {
        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const nas = nasRef.current.value;
        const role = roleRef.current.value;
        if (name !== "" && address !== "" && phoneNumber !== "" && nas !== "" && role!== "") {
            try {
                const response = await axios.post('http://localhost:5000/dashboard_create_employee_account', {
                    name,
                    address,
                    phoneNumber,
                    nas,
                    role,
                });

                console.log("Employee Account created successfully:", response.data);
            } catch (error) {
                console.log("error creating employee account:", error);
            }
            console.log("employee data:", { name, address, phoneNumber, nas,role });
        } else {
            console.error("Fill inputs for creating employee account")
        };

    }

    //delete account
    const handleAccountDeletion = async () => {
        const employeeId = employeeIdRef2.current.value;
        if (employeeId !== "") {
            try {
                const response = await axios.delete(`http://localhost:5000/delete_employee/${employeeId}`);

                console.log("Employee Account deleted successfully:", response.data);
            } catch (error) {
                console.error("Error deleting employee account:", error);
            }
        } else {
            console.error("fill inputs for deleting employee account");
        }
    }

    //update account
    const handleAccountUpdate = async () => {
        const employeeId = employeeIdRef.current.value;
        const name = nameRef2.current.value;
        const address = addressRef2.current.value;
        const phoneNumber = phoneNumberRef2.current.value;
        const nas = nasRef2.current.value;
        const role = roleRef2.current.value;
        if (employeeId !== "") {
            try {
                const response = await axios.put('http://localhost:5000/dashboard_update_employee_account/${employeeId}', {
                    name,
                    address,
                    phoneNumber,
                    nas,
                    role,
                });

                console.log("Account updated successfully:", response.data);
            } catch (error) {
                console.log("error updating employee data:", error);
            }
        } else {
            console.error("fill employee id input");
        }
    }

    //view all employees
    const viewAllemployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard_view_employees_account');

            console.log("All employees:", response.data);
            setAllEmployees(response.data);
        } catch (error) {
            console.log("error Fetching employees:", error);
        }
    }

    return (
        <>
            <div className='mainpage-body-subcontainer'>

                <Form >
                    <h3>Employee section</h3>

                    <h4>Create employee account</h4>
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

                        <Form.Group className="form-group" controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" ref={roleRef} name="nas" placeholder="ex: Receptionist, server" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="create" onClick={() => handleAccountCreation()} >
                        Create account
                    </Button>

                    <h4>Update employee accout</h4>
                    <div className='form-row'>

                        <Form.Group className="form-group" controlId="formBasicEmployeeId">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control type="text" ref={employeeIdRef} name="employeeId" placeholder="#employeeId" />
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

                        <Form.Group className="form-group" controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" ref={roleRef2} name="nas" placeholder="ex: Receptionist, server" />
                        </Form.Group>
                        
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="update" onClick={() => handleAccountUpdate()}>
                        Update account
                    </Button>

                    <h4>Remove employee</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicEmployeeId">
                            <Form.Label>employee Id</Form.Label>
                            <Form.Control type="text" ref={employeeIdRef2} name="employeeId" placeholder="#employeeId" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="delete" onClick={() => handleAccountDeletion()}>
                        Remove employee
                    </Button>
                    <Button variant="dark" className="btn mb-4" type="button" name="viewEmployees" onClick={() => viewAllemployees()} style={{ position: "absolute", right: "0", bottom: "0" }} >
                        See all employees
                    </Button>

                    <ul>
                    {allEmployees.map((employee)=>{
                        return  <li>{employee.employe_id}, {employee.nom} </li>
                    })}
                    </ul>
                </Form>
            </div>
        

        </>
    );
}

export default DashboardEmployee;
