const express = require('express');
const Api = express.Router();
const path = require('path');
const asyncHandler = require('express-async-handler');
const shelljs= require('shelljs');

Api.get('/youtube', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/youtube.html'));
});

Api.get('/restart', asyncHandler(async (req, res) => {
    let shl = shelljs.exec('pm2 restart all').stdout;
    res.json(shl)
}))

module.exports = Api;