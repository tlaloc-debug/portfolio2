const express = require("express");
const mysql = require("mysql");
const app=express();

const database=mysql.createConnection({
    host:"localhost",
    user: "newuser",
    password: "12345",
    database: "portfolio"
});

database.connect (err => {
    if (err) {
        return err;
    }
});

app.get("/micros", (req, res) => {
    database.query("SELECT * FROM micros", (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send(result)
        }
    } );
});

app.listen(3001, () => {
    console.log("running on port 3001")
});