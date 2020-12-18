const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");
const app=express();

app.use(cors());
app.use(bodyparser.json());

let dato=3;

const database=mysql.createConnection({
    host:"localhost",
    user: "newuser",
    password: "12345",
    database: "portfolio"
});


app.get("/user", (req, res) => {
    database.query("SELECT * FROM micros, analog, digital, speeds, memorytype, presentation where micro_id=? and micros.micro_id=analog.adc_id and micros.micro_id=digital.dig_id and micros.micro_id=speeds.speed_id and micros.packages=presentation.box_id and micros.memorytype=memorytype.type_id", [dato], (err, result ) => {
        return res.send(result)
    })
})

app.post("/user", (req, res) => {
    dato=req.body.name;
    res.send()
});

app.listen(3001, () => {
    console.log("running on port 3001")
});