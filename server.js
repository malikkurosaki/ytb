const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 4000
const path = require('path');
const Api = require('./api');

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', Api);


io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => console.log('server berjalan di port ' + port))