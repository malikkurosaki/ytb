const express = require('express');
const Api = express.Router();
const path = require('path');
const asyncHandler = require('express-async-handler');
const shelljs= require('shelljs');

Api.get('/youtube', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/youtube.html'));
});

Api.get('/restart', asyncHandler(async (req, res) => {
    let shl = shelljs.exec('pm2 stop all && pm2 restart all').stdout;

    let sucess = shl.includes('4000');
    res.json(sucess)
}))

module.exports = Api;