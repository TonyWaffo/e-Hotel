import './App.css';
import { useState } from 'react';
import './RoomPage.css';
import Form from 'react-bootstrap/Form';


function Room({room,isSelected,onSelect}) {
    const [role, setRole] = useState("employee");

    //convert the room send into a key/value pair, s that it can be easily displayed on the screen
    let keyValuePairs=Object.keys(room).map(key=>({
        key:key,
        value:room[key],
    }))
    return (
        <>
            <div className='room-item'>
                <div className='room-checkbox'>
                    <Form.Check
                        type={'radio'}
                        id={room.id}
                        checked={isSelected}
                        onChange={onSelect}
                    />
                </div>
                <div className='room-details'>
                    {keyValuePairs.map((obj) => {
                        return <div>
                            <span className="room-title">{obj.key}: </span>
                            <span className="room-text">{Array.isArray(obj.value)? obj.value.join(', '):obj.value}</span><br />
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}

export default Room;
