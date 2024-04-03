require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

app.use(cors()); // Enable CORS for requests from React app

// **Sign up: Send user profile to the database**
app.post('/signup', async (req, res) => {

    //In our case, we should use either the [name, nas, numPhone,address]
    //don't forget to set [role= "client" or "employee"]

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **sign In: Get the user profile **
app.get('/signin', async (req, res) => {

    /*In our case, we should use either:
    -the [userId] to launch the query in case
     the employee want to use the clientID to create a location from scratch,
    -Or the [name, nas] in case someone (client/employee) want to sign in
    
    Also we should retreive all info such as [ID, name, role]
    */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});





// **Room search for client**
app.get('/search_rooms_client', async (req, res) => {

    const { clientId, arrivalDate, departureDate,
        hotelChain, hotelCategory, minNumberRooms, maxNumberRooms,
        minPrice, maxPrice, capacity, view, expandability
    } = req.query;

    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM chambre 
        where prix between ${minPrice} and ${maxPrice}
         
        and extensible=${expandability} 
        and capacite = ${capacity};`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
    }
});

// **Room search for employee**
app.get('/search_rooms_employee', async (req, res) => {

    const { clientId, arrivalDate, departureDate,
        hotelChain, hotelCategory, minNumberRooms, maxNumberRooms,
        minPrice, maxPrice, capacity, view, expandability
    } = req.query;

    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM chambre 
        where prix between ${minPrice} and ${maxPrice}
         
        and extensible=${expandability} 
        and capacite = ${capacity};`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
    }
});

// **Reservation: Search reservation**
app.get('/search_reservation', async (req, res) => {

    const reservationId = req.query.reservationId;

    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM reservation 
            where reservation_id= $1;`;
        const result = await client.query(query, [reservationId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving data' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
    }
});


// **Booking: create a reservation**
app.post('/create_reservation', async (req, res) => {

    const { clientId, arrivalDate, departureDate,
        hotelChain, hotelCategory, minNumberRooms, maxNumberRooms,
        minPrice, maxPrice, capacity, view, expandability
    } = req.body;

    let client;
    try {
        client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
    }
});

// **Rental: Rent a rental for the client by the employee**
app.post('/create_rental', async (req, res) => {

    const { clientId, arrivalDate, departureDate,
        hotelChain, hotelCategory, minNumberRooms, maxNumberRooms,
        minPrice, maxPrice, capacity, view, expandability
    } = req.body;

    let client;
    try {
        client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
    }
});








// **Dashboard: Create client account**
app.post('/dashboard_create_client_account', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashroom: Update client account**
app.post('/dashboard_update_client_account', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Rental: Delete a client accoont**
app.delete('/delete_client/:clientId', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const clientId = req.params.clientId;

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});





// **Dashroom: Create employee account**
app.post('/dashboard_create_employee_account', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashroom: Update employee account**
app.post('/dashboard_update_employee_account', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Rental: Delete an employee accoont**
app.delete('/delete_employee/:employeeId', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const employeeID = req.params.employeeId;

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **dashboard: View all accounts**
app.get('/dashboard_view_account', async (req, res) => {

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});





// **Dashboard: Update hotel**
app.post('/dashboard_update_hotel', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashboard: View hotels**
app.get('/dashboard_view_hotels', async (req, res) => {
    try {
        const client = await pool.connect();
        const query = `select * from hotel;`;
        await client.query(query);
        res.json({ message: 'Hotels viewed successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error viewing hotels' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});






// **Dashboard: Create room**
app.post('/dashboard_create_room', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashboard: Update room**
app.put('/dashboard_update_room', async (req, res) => {

    /**
     * the request for creating a rental should include [arrivDate,departDate,employeeID,clientID,ReservationID,numChambre]
     */

    const { name, description } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO your_table_name (name, description) VALUES ($1, $2)`;
        const values = [name, description];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashboard: View room**
app.get('/dashboard_view_rooms', async (req, res) => {

    try {
        const client = await pool.connect();
        const query = `select * from chambre;`;
        await client.query(query);

        res.json({ message: 'Rooms dispayed successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error viewing rooms' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Rental: Delete a room**
app.delete('/delete_room/:roomId', async (req, res) => {

    const roomId = req.params.roomId;

    try {
        const client = await pool.connect();
        const query = `delete from room where chambre_id=$1;`;
        const values = [roomId];
        await client.query(query, values);

        res.json({ message: 'Room deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting room' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});