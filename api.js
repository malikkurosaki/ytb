const express = require('express');
const Api = express.Router();

Api.get('/youtube', (req, res) => { res.type('html').send('<a id="button" href="https://www.youtube.com/watch?app=desktop&v=yb0uyxFLu3Y">youtube</a>') });
module.exports = Api;