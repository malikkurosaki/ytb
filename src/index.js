import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, child, onValue } from 'firebase/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';


let body = $(document.body).html('<div><H1>Server</H1></div>');
let conten = $('<div class="d-flex flex-row "></div>');
let gambar = $(`<div class="col-6"></div>`);
let log = $(`<div style="height:700px; overflow: scroll;" class="col-6"></div>`);

body.append(conten);
conten.append(gambar);
conten.append(log);

const firebaseConfig = {
    apiKey: "AIzaSyAfACNHRoyIvX4nct4juVabZDgwEDKQ6jY",
    authDomain: "malikkurosaki1985.firebaseapp.com",
    databaseURL: "https://malikkurosaki1985.firebaseio.com",
    projectId: "malikkurosaki1985",
    storageBucket: "malikkurosaki1985.appspot.com",
    messagingSenderId: "27222609089",
    appId: "1:27222609089:web:bf85a0777451fb17da9840"
};

initializeApp(firebaseConfig);
const db = getDatabase();

const starCountRef = ref(db, 'gambar');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    gambar.html(`<img src="data:image/png;base64,${data}" />`);
});

const logRef = ref(db, 'console');
onValue(logRef, (snapshot) => {
    /**@type {String} */
    const data = snapshot.val();
    log.html(data.split("\n").join("</br>"));
});









