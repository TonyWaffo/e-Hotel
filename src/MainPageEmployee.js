import './App.css';
import './MainPage.css';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ImCross } from "react-icons/im";
import axios from 'axios';


function MainPageEmployee({ role }) {

  const reservationIdRef = useRef(null);
  const employeeIdRef = useRef(null);
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

  const [reservationError,setReservationError]=useState({error:false,message:""});
  const [roomSearchError,setRoomSearchError]=useState({error:false,message:""});



  const navigate = useNavigate();
  let reservation;

  const roomSearch = async () => {
    //it's a reservation
    reservation = true;

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
        if (obj.hasOwnProperty(key) && obj[key] === '') {
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
      roomSearchCriteria.expandability = (expandabilityRef.current.value === 'true') ? true : false;

      try {
        const response = await axios.get('http://localhost:5000/search_rooms_employee', { params: roomSearchCriteria });
        console.log('Rooms found successfully:', response.data);
        availableRooms = response.data;
        if(availableRooms.length==0){
          setRoomSearchError({error:true,message:"No Room could be found"});
        }else{
          //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
        navigate('/rooms', { state: { availableRooms, reservation, role } });
        setRoomSearchError({error:false,message:""});
        }
      } catch (error) {
        console.log('error searching rooms:', error);
      }
      console.log('reservation data:', roomSearchCriteria);
    } else {
      setRoomSearchError({error:true,message:" Fill all inputs"});
    };

  }

  const reservationSearch = async () => {

    //it's not a reservation,it's a loaction
    reservation = false;

    //roomReservation represents the rooms displayed with the reservation id
    let roomFromReservation;

    const reservationId=reservationIdRef.current.value;
    const employeeId=employeeIdRef.current.value

    //proccess the data and connect to back end
    if (reservationId!=='' && employeeId!=='') {

      try {
        const response = await axios.get('http://localhost:5000/search_reservation',{ params: {reservationId} });
        roomFromReservation = response.data;
        if(roomFromReservation.length==0){
          setReservationError({error:true,message:"No room could be found"});
        }else{
                  //navigate to the room page with the all the rooms available, the role of the user and tell if it's a reservation or not
        navigate('/rooms', { state: { roomFromReservation, reservation, role, employeeId } });
        setReservationError({error:false,message:""});
        }
      } catch (error) {
        console.log('error searching reservation:', error);
      }
      console.log('reservation id:', reservationId);
    } else {
      setReservationError({error:true,message:" Enter the input"});
    };
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
            <Form.Group className='form-group' controlId='formBasicReservationId'>
              <Form.Label>Reservation number (id)</Form.Label>
              <Form.Control type='text' name='reservationId' ref={reservationIdRef} placeholder='#reservationID' />
            </Form.Group>
            <Form.Group className='form-group' controlId='formBasicEmployeeId'>
              <Form.Label>Employee (id)</Form.Label>
              <Form.Control type='text' name='employeeId' ref={employeeIdRef} placeholder='#employeeID' />
            </Form.Group>
          </div>
          {reservationError.error && <span className='input-error'><ImCross size={20} />{reservationError.message}</span>}
          <Button variant='dark' className='btn mt-4' type='button' name='submit' onClick={reservationSearch}>
            Turn into location
          </Button>

        </Form>
      </div>
      <div className='mainpage-body-subcontainer'>

        <Form >
          <div className='form-row'>
            <Form.Group className='form-group' controlId='formBasicLocationForClient'>
              <Form.Label>Location for</Form.Label>
              <Form.Control type='text' name='clientId' ref={clientIdRef} placeholder='#clientID' />
            </Form.Group>

            <Form.Group className='form-group' controlId='formBasicArrivalDate'>
              <Form.Label>Arrival date</Form.Label>
              <Form.Control type='date' name='arrivalDate' ref={arrivalDateRef} placeholder='Enter full name' />
            </Form.Group>


            <Form.Group className='form-group' controlId='formBasicDepartureDate'>
              <Form.Label>Departure date</Form.Label>
              <Form.Control type='date' name='departureDate' ref={departureDateref} placeholder='email@email.com' />
            </Form.Group>
          </div>

        </Form>
      </div>
      <div className='mainpage-body-subcontainer'>
        <Form >
          <h3>Hotel</h3>
          <div className='form-row'>

            <Form.Group className='form-group' controlId='formBasicHotelChain'>
              <Form.Label>Hotel chain</Form.Label>
              <Form.Select aria-label='Default select example' ref={HotelChainRef}>
                <option value='Lancaster Premium'>Lancaster Premium</option>
                <option value='One Piece Luxury'>One Piece Luxury</option>
                <option value='Luchester Exclusive'>Luchester Exclusive</option>
                <option value='Meridien Elite'>Meridien Elite</option>
                <option value='Alsace Grand'>Alsace Grand</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='form-group' controlId='formBasicHotelCategory'>
              <Form.Label>Hotel category</Form.Label>
              <Form.Select aria-label='Default select example' ref={hotelCategoryRef}>
                <option value='1'>1 star</option>
                <option value='2'>2 star</option>
                <option value='3'>3 star</option>
                <option value='4'>4 star</option>
                <option value='5'>5 star</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='form-group' controlId='formBasicMinBumberRooms'>
              <Form.Label>Min number of rooms</Form.Label>
              <Form.Control type='number' ref={minNumberRoomsRef} name='minNumberRooms' placeholder='' />
            </Form.Group>

            <Form.Group className='form-group' controlId='formBasicMaxBumberRooms'>
              <Form.Label>Max number of rooms</Form.Label>
              <Form.Control type='number' ref={maxNumberRoomsRef} name='maxNumberRooms' placeholder='' />
            </Form.Group>

          </div>
        </Form>
      </div>
      <div className='mainpage-body-subcontainer'>
        <Form >
          <h3>Room</h3>
          <div className='form-row'>
            <Form.Group className='form-group' controlId='formBasicMinPrice'>
              <Form.Label>Min price</Form.Label>
              <Form.Control type='Number' ref={minPriceRef} name='minPrice' placeholder='0' />
            </Form.Group>


            <Form.Group className='form-group' controlId='formBasicMaxPrice'>
              <Form.Label>Max price</Form.Label>
              <Form.Control type='number' ref={maxPriceRef} name='maxPrice' placeholder='5000' />
            </Form.Group>

            <Form.Group className='form-group' controlId='formBasicCapacity'>
              <Form.Label>Capacity</Form.Label>
              <Form.Select aria-label='Default select example' ref={capacityRef}>
                <option value='1'>1 person</option>
                <option value='2'>2 people</option>
                <option value='3'>3 people</option>
                <option value='4'>4 people</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='form-group' controlId='formBasicView'>
              <Form.Label>View</Form.Label>
              <Form.Select aria-label='Default select example' ref={viewRef}>
                <option value='mer'>Beach</option>
                <option value='ville'>City</option>
                <option value='jardin'>Garden</option>
                <option value='montagne'>Mountain</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='form-group' controlId='formBasicExpandability'>
              <Form.Label>Expandability</Form.Label>
              <Form.Select aria-label='Default select example' ref={expandabilityRef}>
                <option value='true'>No</option>
                <option value='false'>Yes</option>
              </Form.Select>
            </Form.Group>

          </div>
          {roomSearchError.error && <span className='input-error'><ImCross size={20} />{roomSearchError.message}</span>}
          <Button variant='dark' className='btn mt-4' type='button' name='submit' onClick={roomSearch}>
            Search room
          </Button>

        </Form>
      </div>

    </div>
  );
}

export default MainPageEmployee;
