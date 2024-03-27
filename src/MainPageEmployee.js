import './App.css';
import './MainPage.css';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function MainPageEmployee({role}) {

  const navigate = useNavigate();
  let reservation;

  const roomSearch = () => {
    //it's a reservation
    reservation=true;


    //availableRooms represents the rooms displayed from the employee's filter
    const availableRooms = [
      {
        chain: "Marriot Chain",
        hotel: "Sheraton",
        id: 20114,
        categories: 4,
        commodity: ["balcony", "kitchen", "amenities"],
        issues: ["heater", "air conditionner"],
        price: 200,
      },
      {
        chain: "Germain Chain",
        hotel: "Alt",
        id: 1114,
        categories: 5,
        commodity: ["balcony", "kitchen", "amenities"],
        issues: ["Ice machine", "air conditionner"],
        price: 400,
      },
      {
        chain: "Marriot Chain",
        hotel: "Delta",
        id: 12114,
        categories: 2,
        commodity: ["dog friendly", "oven", "smoker friendly"],
        issues: ["n0 security", "smell weed"],
        price: 50,
      },
      {
        chain: "Four seasons Chain",
        hotel: "Four seasons",
        id: 20214,
        categories: 5,
        commodity: ["balcony", "kitchen", "amenities", "club", "spa"],
        issues: [],
        price: 700,
      },
    ];
    //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
    navigate('/rooms', { state: { availableRooms,reservation,role } }); 
  }

  const reservationSearch = () => {

    //it's not a reservation,it's a loaction
    reservation=false;

  //roomReservation represents the rooms displayed with the reservation id
      const roomFromReservation = [
      {
        chain: "Marriot Chain",
        hotel: "Sheraton",
        id: 20114,
        categories: 4,
        commodity: ["balcony", "kitchen", "amenities"],
        issues: ["heater", "air conditionner"],
        price: 200,
      },
    ];

    //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
    navigate('/rooms', { state: { roomFromReservation,reservation,role } }); 

  }

  return (
    <div className='mainpage-body'>
      <div>
        <h2>Find your room</h2>
      </div>
      <div className='mainpage-body-subcontainer'>

        <Form >
          <h3>Create from a reservation</h3>
          <div className='form-row'>
            <Form.Group className="form-group" controlId="formBasicFullname">
              <Form.Label>Reservation number (id)</Form.Label>
              <Form.Control type="text" name="reservaionId" placeholder="#reservationID" />
            </Form.Group>
          </div>
          <Button variant="dark" className="btn mt-4" type="button" name="submit" onClick={reservationSearch}>
            Turn into location
          </Button>

        </Form>
      </div>
      <div className='mainpage-body-subcontainer'>

        <Form >
          <div className='form-row'>
            <Form.Group className="form-group" controlId="formBasicLocationForClient">
              <Form.Label>Location for</Form.Label>
              <Form.Control type="text" name="clientID" placeholder="#clientID" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicDepartureDate">
              <Form.Label>Arrival date</Form.Label>
              <Form.Control type="date" name="arrivalDate" placeholder="Enter full name" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicArrivalDate">
              <Form.Label>Departure date</Form.Label>
              <Form.Control type="date" name="departureDate" placeholder="email@email.com" />
            </Form.Group>
          </div>

        </Form>
      </div>
      <div className='mainpage-body-subcontainer'>
        <Form >
          <h3>Hotel</h3>
          <div className='form-row'>

            <Form.Group className="form-group" controlId="formBasicFullname">
              <Form.Label>Hotel chain</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="simple">Chain 1</option>
                <option value="double">Chain 2</option>
                <option value="suite">Chain 3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicFullname">
              <Form.Label>Hotel category</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="simple">3 star</option>
                <option value="double">3 star</option>
                <option value="suite">3 star</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicSuperficy">
              <Form.Label>number of hotels</Form.Label>
              <Form.Control type="number" name="superficy" placeholder="" />
            </Form.Group>

          </div>
        </Form>
      </div>
      <div className='mainpage-body-subcontainer'>
        <Form >
          <h3>Room</h3>
          <div className='form-row'>
            <Form.Group className="form-group" controlId="formBasicMinPrice">
              <Form.Label>Min price</Form.Label>
              <Form.Control type="Number" name="minPrice" placeholder="0" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicMinPrice">
              <Form.Label>Max price</Form.Label>
              <Form.Control type="number" name="maxPrice" placeholder="5000" />
            </Form.Group>
            <Form.Group className="form-group" controlId="formBasicFullname">
              <Form.Label>capacity</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="simple">Simple bed room</option>
                <option value="double">Double bed room</option>
                <option value="suite">Suite</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="form-group" controlId="formBasicSuperficy">
              <Form.Label>Superficy</Form.Label>
              <Form.Control type="number" name="superficy" placeholder="Space in feet" />
            </Form.Group>
          </div>
          <Button variant="dark" className="btn mt-4" type="button" name="submit" onClick={roomSearch}>
            Search room
          </Button>

        </Form>
      </div>

    </div>
  );
}

export default MainPageEmployee;
