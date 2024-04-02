import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const MyVerticallyCenteredModal=(props)=> {
  // Ensure props.selectedRoom exists before accessing its properties
  const room = props.details || {};
  console.log(room) 


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Location/reservation created 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Confirmation</h4>
        <p>
          <span>Hotel: </span>{room.hotel}<br/>
          <span>Reservation Id: </span>{room.id}<br/>
          <span>Price: </span>{room.price}<br/>
          <span>Category: </span>{room.categories}<br/>

        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;