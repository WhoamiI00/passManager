const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let collection;

client.connect()
    .then(() => {
        collection = client.db('PassOP').collection('passwords');
        console.log("Connected to MongoDB");
    })
    .catch(err => console.error(err));

// POST route to save passwords
app.post('/api/passwords', async (req, res) => {
    const { site, username, password } = req.body;
    const newPassword = { site, username, password, id: new Date().getTime().toString() };
    try {
        await collection.insertOne(newPassword);
        res.status(201).send('Password saved successfully');
    } catch (error) {
        res.status(500).send('Error saving password');
    }
});

// GET route to retrieve all passwords
app.get('/api/passwords', async (req, res) => {
    try {
        const passwords = await collection.find({}).toArray();
        res.json(passwords);
    } catch (error) {
        res.status(500).send('Error retrieving passwords');
    }
});

// DELETE route to delete a password by ID
app.delete('/api/passwords/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await collection.deleteOne({ id });
        res.status(200).send('Password deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting password');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
