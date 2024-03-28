require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
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

// **Retrieve available rooms: Check all available rooms**
app.get('/availableRooms', async (req, res) => {
    /*the query should match [ departDate, arrivDate,minPrice, maxPrice,capacity,superficy,
    HotelChain,hotelCategory, maybe number of Hotels]
    and the result should include [chainHotel,hotel, numChambre, categories,commodity,
    issues ,price,departDate, arrivDate]
    */ 
    try {
        const client = await pool.connect();
        const query = `SELECT * FROM your_table_name`;
        const result = await client.query(query);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Booking: Book a room for the client**
app.post('/booking', async (req, res) => {

    /**
     * the request for creating reservation should include [arrivDate,departDate,clientID,numChambre]
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

// **Rental: Rent a room for the client by the employee**
app.post('/rent', async (req, res) => {

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

// **Rental: Rent a room for the client by the employee**
app.post('/lookReservation', async (req, res) => {

    /**
     * the request for looking reservation should include [reservationID]
     * and the result should include [chainHotel,hotel, numChambre, categories,commodity,
     * issues ,price,departDate, arrivDate, clientID]
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


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});