import './App.css';
import Banner from './Banner';
import './Dashboard.css';
import './MainPage.css'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function DashboardEmployee() {
    return (
        <>
            <div className='mainpage-body-subcontainer'>

            <Form >
                    <h3>Employee section</h3>

                    <h4>Create an employee account</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter full name" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Street, Street number, City, Province, Country" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" name="phoneNumber" placeholder="Tel" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicNas">
                            <Form.Label>NAS</Form.Label>
                            <Form.Control type="text" name="nas" placeholder="XXX XXX XXX" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" >
                        Create account
                    </Button>

                    <h4>Update an employee acount</h4>
                    <div className='form-row'>
                    <Form.Group className="form-group" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name2" placeholder="Enter full name" />
                        </Form.Group>


                        <Form.Group className="form-group" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Street, Street number, City, Province, Country" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" name="phoneNumber" placeholder="Tel" />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicNas">
                            <Form.Label>NAS</Form.Label>
                            <Form.Control type="text" name="nas" placeholder="XXX XXX XXX" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" >
                        Update account
                    </Button>

                    <h4>Fire an employee</h4>
                    <div className='form-row'>
                        <Form.Group className="form-group" controlId="formBasicEmployeeId">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control type="text" name="employeeId" placeholder="#employeeId" />
                        </Form.Group>
                    </div>

                    <Button variant="dark" className="btn mb-4" type="button" name="submit" >
                        Fire employee
                    </Button>
                    <Button variant="dark" className="btn mb-4" type="button" name="submit"  style={{position:"absolute",right:"0",bottom:"0"}}>
                        See all employees
                    </Button>
                </Form>
            </div>

        </>
    );
}

export default DashboardEmployee;
