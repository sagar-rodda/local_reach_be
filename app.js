require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());

// Log HTTP method and path for every request
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API Running'
    });
});

app.use('/api/v1', require('./v1'));

module.exports = app;
