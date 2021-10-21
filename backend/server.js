var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("./config");
var app = express();

mongoose.connect("mongodb://localhost:27017/weather");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("connect to database");
});

app.use(bodyparser.json());
app.use(express.static("public"));
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);
app.get("/", function (req, res) {
    res.set({ "Allow-access-Allow-Orgin": "*" });
    res.send("hello ");
});




app.post("/login", function (req, res) {
    const { email, password } = req.body;
    db.collection("register").findOne({ email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Internal server error" });
            return;
        }
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const { password: _password, ...data } = user;
        if (password !== _password) {
            res.status(403).send({ message: "Invalid Credentials" });
            return;
        }
        const token = jwt.sign({ id: user._id }, config.secretkey, {
            expiresIn: 24 * 60 * 60,
        });
        res.status(200).send({
            ...data,
            token,
        });
    });
});

app.post("/registration", function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var number = req.body.number;
    var password = req.body.password;
    var cpassword = req.body.cpassword;

    var userData = {
        username: username,
        email: email,
        number: number,
        password: password,
        cpassword: cpassword,
    };
    db.collection("register").insertOne(userData, (err, collection) => {
        if (err) {
            throw err;
        }
        res.send({ message: "Registration suceessfull" });
    });
});

var server = app.listen(8081, function () {
    console.log("server ...");
    console.log(server.address().port);
});
