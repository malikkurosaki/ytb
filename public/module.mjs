import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyAfACNHRoyIvX4nct4juVabZDgwEDKQ6jY",
  authDomain: "malikkurosaki1985.firebaseapp.com",
  databaseURL: "https://malikkurosaki1985.firebaseio.com",
  projectId: "malikkurosaki1985",
  storageBucket: "malikkurosaki1985.appspot.com",
  messagingSenderId: "27222609089",
  appId: "1:27222609089:web:bf85a0777451fb17da9840"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const imgRef = ref(db, 'gambar');
onValue(imgRef, (snapshot) => {
  const data = snapshot.val();
  document.getElementById('image').innerHTML = `<div><img style="width:100%" src="data:image/png;base64,${data}" /></div>`;
});

const logRef = ref(db, 'console');
onValue(logRef, (snapshot) => {
  const data = snapshot.val();
  document.getElementById("log").innerHTML = data.split("\n").join("</br>");
});

const percobaanRef = ref(db, 'percobaan');
onValue(percobaanRef, (snapshot) => {
  const data = snapshot.val();
  document.getElementById("percobaan").innerHTML = data;
});

const menontonRef = ref(db, 'menonton');
onValue(menontonRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data, "ini datanya");
  document.getElementById("menonton").innerHTML = data
});

