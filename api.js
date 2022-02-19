const express = require('express');
const Api = express.Router();
const path = require('path');

Api.get('/youtube', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/youtube.html'));
});

module.exports = Api;