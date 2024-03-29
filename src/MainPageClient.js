import './App.css';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function MainPageClient({role}) {

  const navigate = useNavigate();

  const roomSearch = () => {

    //it's a reservation
    const reservation=true;

    //availableRooms represents the rooms displayed from the client's filter
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
    ];

    //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
    navigate('/rooms', { state: { availableRooms, reservation,role } }); 


  }

  return (
    <div className='mainpage-body'>
      <div>
        <h2>Find your room</h2>
      </div>
      <div className='mainpage-body-subcontainer'>
        
        <Form >
          <div className='form-row'>
            <Form.Group className="form-group" controlId="formBasicDepartureDate">
              <Form.Label>Arrival date</Form.Label>
              <Form.Control type="date" name="arrivalDate" placeholder="Enter full name" />
            </Form.Group>
            

            <Form.Group  className="form-group" controlId="formBasicArrivalDate">
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

            <Form.Group className="form-group" controlId="formBasicMinBumberRooms">
              <Form.Label>Min number of rooms</Form.Label>
              <Form.Control type="number" name="minNumberRooms" placeholder="" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicMaxBumberRooms">
              <Form.Label>Max number of rooms</Form.Label>
              <Form.Control type="number" name="maxNumberRooms" placeholder="" />
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
            

            <Form.Group  className="form-group" controlId="formBasicMinPrice">
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

export default MainPageClient;
