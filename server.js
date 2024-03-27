require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    //We gotta change this field to our database credentials
    //connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

app.use(cors()); // Enable CORS for requests from React app

// **Create Data (POST)**
app.post('/data', async (req, res) => {
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

// **Read All Data (GET)**
app.get('/data', async (req, res) => {
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

// **Update Data (PUT)**
app.put('/data/:id', async (req, res) => {
    const { id, name, description } = req.body; // Extract data from request body and path parameter

    try {
        const client = await pool.connect();
        const query = `UPDATE your_table_name SET name = $1, description = $2 WHERE id = $3`;
        const values = [name, description, id];
        await client.query(query, values);

        res.json({ message: `Data with ID ${id} updated successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error updating data with ID ${id}` });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

// **Delete Data (DELETE)**
app.delete('/data/:id', async (req, res) => {
    const { id } = req.params; // Extract ID from path parameter

    try {
        const client = await pool.connect();
        const query = `DELETE FROM your_table_name WHERE id = $1`;
        const values = [id];
        await client.query(query, values);

        res.json({ message: `Data with ID ${id} deleted successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error deleting data with ID ${id}` });
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});