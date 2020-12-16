const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app=express();

app.use(cors());

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
    database.query("SELECT * FROM micros, analog, digital, speeds, memorytype, presentation where  micros.micro_id=analog.adc_id and micros.micro_id=digital.dig_id and micros.micro_id=speeds.speed_id and micros.packages=presentation.box_id and micros.memorytype=memorytype.type_id", (err, result) => {
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