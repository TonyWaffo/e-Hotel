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

    try {
        client = await pool.connect();

        if (user == "client") {
            query = `select client_id from client where nom=$1 and nas=$2;`;
        } else if (user == "employee"){
            query = `select employe_id from employe where nom=$1 and nas=$2;`;
        }else{
            query = `select gestionnaire_id from gestionnaire where gestionnaire_id=$1 and hotel_id <> $2`;
        }
        const values = [name, nas];
        const result=await client.query(query, values);
        const response = result.rows[0]; // Access client_id only if rows exist
        res.json({ response });
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

    const { name, address,phoneNumber,nas } = req.body; // Extract data from request body

    let client;
    try {
        client = await pool.connect();
        const query = `INSERT INTO client (nom, adresse,telephone,nas) VALUES ($1, $2, $3, $4);`;
        const values = [name, address,phoneNumber,nas];
        await client.query(query, values);

        res.json({ message: 'Client created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating client' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashroom: Update client account**
app.put('/dashboard_update_client_account/:clientId', async (req, res) => {
    const clientId = req.params.clientId;

    // Column mapping
    const columnMapping = {
        clientId: 'client_id',
        name: 'nom',
        address: 'adresse',
        phoneNumber: 'telephone',
        nas: 'nas'
    };

    let detailsToUpdate = req.body; // Extract data from request body

    let query = `UPDATE client SET`;
    let values = [];

    // Iterate over the properties of the data sent
    for (const key in detailsToUpdate) {
        if (Object.hasOwnProperty.call(detailsToUpdate, key)) {
            const value = detailsToUpdate[key];
            // Check if the key value exists in the mapping
            if (columnMapping[key]) {
                // Append column and value to the SQL
                values.push(value);
                query += ` ${columnMapping[key]} = $${values.length},`; // Note the comma at the end
            }
        }
    }

    // Remove the comma at the end of the actual query
    query = query.slice(0, -1);

    // Add the WHERE clause
    query += ` WHERE client_id = '${clientId}';`;

    let client;

    try {
        client = await pool.connect();
        console.log(query);
        console.log(values);
        await client.query(query, values); // Provide values here


        res.json({ message: 'Client updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating client' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
    }

});

// **Rental: Delete a client accoont**
app.delete('/delete_client/:clientId', async (req, res) => {

    const clientId = req.params.clientId;

    let client;

    try {
        client = await pool.connect();
        const query = `delete from client where client_id=$1;`;
        const values = [clientId];
        await client.query(query, values);

        res.json({ message: 'client deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error deleting client ${clientId}` });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});





// **Dashroom: Create employee account**
app.post('/dashboard_create_employee_account', async (req, res) => {
    
    const { name, address,phoneNumber,nas,role } = req.body; // Extract data from request body

    let client;
    try {
        client = await pool.connect();
        const query = `INSERT INTO employe (nom, adresse,telephone,nas,role) VALUES ($1, $2, $3, $4, $5);`;
        const values = [name, address,phoneNumber,nas,role];
        await client.query(query, values);

        res.json({ message: 'Employee created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating employee' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashroom: Update employee account**
app.put('/dashboard_update_employee_account/:employeeId', async (req, res) => {

    const employeeId = req.params.employeeId;

    // Column mapping
    const columnMapping = {
        employeeId: 'employe_id',
        name: 'nom',
        address: 'adresse',
        phoneNumber: 'telephone',
        nas: 'nas',
        role:'role',
    };

    let detailsToUpdate = req.body; // Extract data from request body

    let query = `UPDATE employe SET`;
    let values = [];

    // Iterate over the properties of the data sent
    for (const key in detailsToUpdate) {
        if (Object.hasOwnProperty.call(detailsToUpdate, key)) {
            const value = detailsToUpdate[key];
            // Check if the key value exists in the mapping
            if (columnMapping[key]) {
                // Append column and value to the SQL
                values.push(value);
                query += ` ${columnMapping[key]} = $${values.length},`; // Note the comma at the end
            }
        }
    }

    // Remove the comma at the end of the actual query
    query = query.slice(0, -1);

    // Add the WHERE clause
    query += ` WHERE employe_id = '${employeeId}';`;

    let client;

    try {
        client = await pool.connect();
        console.log(query);
        console.log(values);
        await client.query(query, values); // Provide values here


        res.json({ message: 'Employee updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating employee' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
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
app.put('/dashboard_update_hotel/:hotelId', async (req, res) => {

    const hotelId = req.params.hotelId;

    // Column mapping
    const columnMapping = {
        email: 'email',
        address: 'adresse',
        phoneNumber: 'telephone',
        classHotel: 'nombre_etoile'
    };

    let detailsToUpdate = req.body; // Extract data from request body

    let query = `UPDATE hotel SET`;
    let values = [];

    // Iterate over the properties of the data sent
    for (const key in detailsToUpdate) {
        if (Object.hasOwnProperty.call(detailsToUpdate, key)) {
            const value = detailsToUpdate[key];
            // Check if the key value exists in the mapping
            if (columnMapping[key]) {
                // Append column and value to the SQL
                values.push(value);
                query += ` ${columnMapping[key]} = $${values.length},`; // Note the comma at the end
            }
        }
    }

    // Remove the comma at the end of the actual query
    query = query.slice(0, -1);

    // Add the WHERE clause
    query += ` WHERE hotel_id = '${hotelId}';`;

    let client;

    try {
        client = await pool.connect();
        console.log(query);
        console.log(values);
        await client.query(query, values); // Provide values here


        res.json({ message: 'Hotel updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating hotel' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
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

    const { roomId, issues,view, commodity } = req.body; // Extract data from request body

    let client;

    try {
        client = await pool.connect();
        const query = `INSERT INTO chambre (chambre_id, probleme,commodite,vue) VALUES ($1, $2, $3, $4);`;
        const values = [roomId,issues,commodity, view];
        await client.query(query, values);

        res.json({ message: 'Room created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data' });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Dashboard: Update room**
app.put('/dashboard_update_room/:roomId', async (req, res) => {

    const roomId = req.params.roomId;

    // Column mapping
    const columnMapping = {
        issues: 'probleme',
        view: 'vue',
        commodity: 'commodite',
    };

    let detailsToUpdate = req.body; // Extract data from request body

    let query = `UPDATE chambre SET`;
    let values = [];

    // Iterate over the properties of the data sent
    for (const key in detailsToUpdate) {
        if (Object.hasOwnProperty.call(detailsToUpdate, key)) {
            const value = detailsToUpdate[key];
            // Check if the key value exists in the mapping
            if (columnMapping[key]) {
                // Append column and value to the SQL
                values.push(value);
                query += ` ${columnMapping[key]} = $${values.length},`; // Note the comma at the end
            }
        }
    }

    // Remove the comma at the end of the actual query
    query = query.slice(0, -1);

    // Add the WHERE clause
    query += ` WHERE chambre_id = '${roomId}';`;

    let client;

    try {
        client = await pool.connect();
        console.log(query);
        console.log(values);
        await client.query(query, values); // Provide values here


        res.json({ message: 'Room updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating room' });
    } finally {
        if (client) {
            client.release(); // Release the connection back to the pool
        }
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
        const query = `delete from chambre where chambre_id=$1;`;
        const values = [roomId];
        await client.query(query, values);

        res.json({ message: 'Room deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error deleting rooom ${roomId}` });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});