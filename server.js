const express = require('express');
const app = express();
const port = process.env.PORT || 4000
const path = require('path');
const Api = require('./api');

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', Api);


app.listen(port, () => console.log('server berjalan di port '+port))