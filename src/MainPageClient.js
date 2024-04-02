import './App.css';
import './MainPage.css';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function MainPageClient({ role }) {

  const clientIdRef = useRef(null);
  const arrivalDateRef = useRef(null);
  const departureDateref = useRef(null);
  const HotelChainRef = useRef(null); //the number if stars of the hotel
  const hotelCategoryRef = useRef(null);
  const minNumberRoomsRef = useRef(null);
  const maxNumberRoomsRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const capacityRef = useRef(null);
  const viewRef = useRef(null);
  const expandabilityRef = useRef(null);

  const navigate = useNavigate();

  const roomSearch = async () => {

    //it's a reservation
    const reservation = true;

    //availableRooms represents the rooms displayed from the employee's filter
    let availableRooms;

    //collect the searching criteria of the user
    const roomSearchCriteria = {
      clientId: clientIdRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      departureDate: departureDateref.current.value,
      hotelChain: HotelChainRef.current.value,
      hotelCategory: hotelCategoryRef.current.value,
      minNumberRooms: minNumberRoomsRef.current.value,
      maxNumberRooms: maxNumberRoomsRef.current.value,
      minPrice: minPriceRef.current.value,
      maxPrice: maxPriceRef.current.value,
      capacity: capacityRef.current.value,
      view: viewRef.current.value,
      expandability: expandabilityRef.current.value
    };

    //check for empty inputs
    function checkNonEmptyValues(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === "") {
          return false; //return false if there is any empty string
        }
      }
      return true; //all values are not empty
    };

    //proccess the data and connect to back end
    if (checkNonEmptyValues(roomSearchCriteria)) {
      //convert to integer(decimal base-10)
      roomSearchCriteria.hotelCategory = parseInt(roomSearchCriteria.hotelCategory);
      roomSearchCriteria.capacity = parseInt(capacityRef.current.value, 10);

      //convert to boolean
      roomSearchCriteria.view = (viewRef.current.value === "true") ? true : false;

      try {
        const response = await axios.get('http://localhost:5000/search_rooms_client', { params: roomSearchCriteria });
        console.log("Rooms found successfully:", response.data);
        availableRooms = response.data;
        //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
        navigate('/rooms', { state: { availableRooms, reservation, role } });
      } catch (error) {
        console.log("error searching rooms:", error);
      }
      console.log("reservation data:", roomSearchCriteria);
    } else {
      console.error("Fill all inputs for searching rooms");
    };


    availableRooms = [
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
    //remove the following line when connected to the server
    //navigate('/rooms', { state: { availableRooms, reservation, role } });


  }

  return (
    <div className='mainpage-body'>
      <div>
        <h2>Find your room</h2>
      </div>
      <div className='mainpage-body-subcontainer'>

        <Form >
          <div className='form-row'>
            <Form.Group className="form-group" controlId="formBasicLocationForClient">
              <Form.Label>Location for</Form.Label>
              <Form.Control type="text" name="clientId" ref={clientIdRef} placeholder="#clientID" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicArrivalDate">
              <Form.Label>Arrival date</Form.Label>
              <Form.Control type="date" name="arrivalDate" ref={arrivalDateRef} placeholder="Enter full name" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicDepartureDate">
              <Form.Label>Departure date</Form.Label>
              <Form.Control type="date" name="departureDate" ref={departureDateref} placeholder="email@email.com" />
            </Form.Group>
          </div>

        </Form>
      </div>
      <div className='mainpage-body-subcontainer'>
        <Form >
          <h3>Hotel</h3>
          <div className='form-row'>

            <Form.Group className="form-group" controlId="formBasicHotelChain">
              <Form.Label>Hotel chain</Form.Label>
              <Form.Select aria-label="Default select example" ref={HotelChainRef}>
                <option value="Lancaster Premium">Lancaster Premium</option>
                <option value="One Piece Luxury">One Piece Luxury</option>
                <option value="Luchester Exclusive">Luchester Exclusive</option>
                <option value="Meridien Elite">Meridien Elite</option>
                <option value="Alsace Grand">Alsace Grand</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicHotelCategory">
              <Form.Label>Hotel category</Form.Label>
              <Form.Select aria-label="Default select example" ref={hotelCategoryRef}>
                <option value="1">1 star</option>
                <option value="2">2 star</option>
                <option value="3">3 star</option>
                <option value="4">4 star</option>
                <option value="5">5 star</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicMinBumberRooms">
              <Form.Label>Min number of rooms</Form.Label>
              <Form.Control type="number" ref={minNumberRoomsRef} name="minNumberRooms" placeholder="" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicMaxBumberRooms">
              <Form.Label>Max number of rooms</Form.Label>
              <Form.Control type="number" ref={maxNumberRoomsRef} name="maxNumberRooms" placeholder="" />
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
              <Form.Control type="Number" ref={minPriceRef} name="minPrice" placeholder="0" />
            </Form.Group>


            <Form.Group className="form-group" controlId="formBasicMaxPrice">
              <Form.Label>Max price</Form.Label>
              <Form.Control type="number" ref={maxPriceRef} name="maxPrice" placeholder="5000" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Select aria-label="Default select example" ref={capacityRef}>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicView">
              <Form.Label>View</Form.Label>
              <Form.Select aria-label="Default select example" ref={viewRef}>
                <option value="mer">Beach</option>
                <option value="ville">City</option>
                <option value="jardin">Garden</option>
                <option value="montagne">Mountain</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicExpandability">
              <Form.Label>Expandability</Form.Label>
              <Form.Select aria-label="Default select example" ref={expandabilityRef}>
                <option value="true">No</option>
                <option value="false">Yes</option>
              </Form.Select>
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
