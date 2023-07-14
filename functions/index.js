const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");

const app = express();

const serviceAccount = require("./series.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://series-b5804-default-rtdb.firebaseio.com"

});

const db = admin.firestore();

app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
    return res.status(200).json({ message: "Hello World!" });
});


// Routes
//app.use(require("./routes/products.routes"));ojo

app.use(require('./routes/series.routes'));

exports.app = functions.https.onRequest(app);