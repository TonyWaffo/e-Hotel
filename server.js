require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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

    const { name, nas, phone, address } = req.body; // Extract data from request body

    try {
        const client = await pool.connect();
        const query = `INSERT INTO client (nom, nas,telephone,adresse) VALUES ($1, $2, $3, $4)`;
        const values = [name, nas, phone, address];
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

    const { name, nas, user } = req.query; // Extract data from request body

    let client;
    let query;
    console.log(user);
    console.log(name);
    console.log(nas);
    try {
        client = await pool.connect();

        if (user == "client") {
            query = `select client_id from client where nom=$1 and nas=$2;`;
        } else {
            query = `select employe_id from employe where nom=$1 and nas=$2;`;
        }
        const values = [name, nas];
        const result=await client.query(query, values);
        if (result.rows.length === 0) {
            console.log(result.rows);
            return res.status(404).json({ message: 'User not found' }); // Or a more specific message
          }
          const resp = result.rows[0]; // Access client_id only if rows exist
          res.json({ resp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Logging in' });
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

    const { reservation_id, date_reservation,
        employe_id, client_id, archive_id, chambre_id } = req.body;

    // Get today's date
    const today = new Date();

    // Extract day, month, and year
    const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits with leading zero if necessary
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const year = today.getFullYear();

    // Format date as "DD/MM/YYYY"
    const formattedDate = `${day}/${month}/${year}`;

    let client;
    try {
        client = await pool.connect();

        // Query to retrieve the montant from the room table
        const roomQuery = `SELECT prix FROM chambre WHERE chambre_id = $1`;
        const roomResult = await client.query(roomQuery, [chambre_id]);
        const price = roomResult.rows[0].prix;

        const query = `INSERT INTO location (date_location, montant,
             employe_id, client_id, reservation_id, chambre_id) VALUES ($1, $2, $3, $4, $5, $6,$7,$8);`;
        const values = [formattedDate, price, employe_id,client_id,reservation_id,chambre_id];
        const result= await client.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving data' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
    }
});








// **Dashboard: Create client account**
app.post('/dashboard_create_client_account', async (req, res) => {

    const { name, description } = req.body; // Extract data from request body

    let client;
    try {
        client = await pool.connect();
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

    const { name, description } = req.body; // Extract data from request body

    let client;

    try {
        client = await pool.connect();
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

    const clientId = req.params.clientId;

    let client;

    try {
        client = await pool.connect();
        const query = `delete from client where client_id=$1`;
        const values = [clientId];
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
    
    const { name, description } = req.body; // Extract data from request body
    let client;

    try {
        client = await pool.connect();
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
    let client;

    try {
        client = await pool.connect();
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

    const employeeId = req.params.employeeId;
    let client;

    try {
        client = await pool.connect();
        const query = `delete from employe where employe_id=$1`;
        const values = [employeeId];
        await client.query(query, values);

        res.json({ message: 'Data created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **dashboard: View all clients accounts**
app.get('/dashboard_view_clients_account', async (req, res) => {

    let client;

    try {
        client = await pool.connect();
        const query = `select * from client;`;
        result =await client.query(query);
        console.error(result.rows);
        res.json({ message: 'Clients extracted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error extracting clients' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **dashboard: View all clients accounts**
app.get('/dashboard_view_employees_account', async (req, res) => {

    let client;

    try {
        client = await pool.connect();
        const query = `select * from employe;`;
        result =await client.query(query);
        console.error(result.rows);
        res.json({ message: 'Employees extracted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error extracting employee' });
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

    let client;

    try {
        client = await pool.connect();
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

    let client;

    try {
        client = await pool.connect();
        const query = `select * from hotel;`;
        const result = await client.query(query);
        res.json(result.rows);
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

    let client;

    try {
        client = await pool.connect();
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
    let client;

    try {
        client = await pool.connect();
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

    let client;

    try {
        client = await pool.connect();
        const query = `select * from chambre;`;
        const result = await client.query(query);
        res.json(result.rows);
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
    let client;

    try {
        client = await pool.connect();
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