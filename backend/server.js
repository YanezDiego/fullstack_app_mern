const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan")
const Data = require("./data")

const API_PORT = 3001;
const app = express();
const router = express.Router();

// DB Setup with MongoDB

const dbRoute = "mongodb+srv://mern-app:mern-app@sandbox-ovxzs.mongodb.net/test?retryWrites=true"

//connects our back end code to the database

mongoose.connect(
    dbRoute,
    {useNewUrlParser: true}
);

let db = mongoose.connection;

db.once("open", () => console.log('connected to the database'));

// checks if connection to the database is successful

db.on('error', console.error.bind(console, "MongoDB connection error:"));

// this part is optional. It is made for logging and
// bodyParser, parses the request made into readable Json Format
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json())
app.use(logger("dev"));

//this is the get function
// this method is going to fetch all the data in our DB;
router.get("/getData", (req, resp) => {
    Data.find((err, data) => {
        if (err) return resp.json({success: false, error: err});
        return resp.json({success: true, data: data})
    });
});

//Bellow is the update function
// This will overwrite excisting data in our DB
router.post("/updateData",(req, resp) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if (err) return resp.json({success: false, error: err});
        return resp.json({success: true})
    });
});

//Delete Function.
// this will delete any exciting data from the DB
router.delete("/deleteData", (req, resp) => {
    const { id } = req.body
    Data.findONeAndDelete(id, err => {
        if (err) return resp.json({success: false, error: err});
        return resp.json({success: true });
    });
});

// This will be our create function
// this will create new data and adds it to the database
router.post("/putData", (req, resp) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return resp.json({
            success: false,
            error: "Invalid Inputs"
        })
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return resp.json({success: false, error: err});
        return resp.json({success: true});
     });
});

// append /api to our http request
app.use("/api", router);

// launch the backend into a port

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
