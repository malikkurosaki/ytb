const expressAsyncHandler = require("express-async-handler");
const database = require("firebase-admin");
const serviceAccount = require("../malikkurosaki1985-firebase-adminsdk-gdzr0-797f4fb50d.json");

database.initializeApp({
    credential: database.credential.cert(serviceAccount),
    databaseURL: "https://malikkurosaki1985.firebaseio.com"
});

const db = database.database()

// db.ref('message').on('value', (data) => {
//     console.log(data.val())
// })

// db.ref('message').set("apa ini");
// res.send("ini dia")


module.exports = {
    db
}