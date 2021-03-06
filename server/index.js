const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");
const app=express();

app.use(cors());
app.use(bodyparser.json());

var dato;
var memory;
var eeprom;
var ram;
var pins;
var channels;


const database=mysql.createConnection({
    host:"localhost",
    user: "newuser",
    password: "12345",
    database: "portfolio"
});

app.post("/search", (req, res) => {
    dato=req.body.name;
    dato="%"+dato+"%";
    database.query("SELECT * FROM micros, analog, digital, speeds, memorytype, presentation where product like ? and micros.micro_id=analog.adc_id and micros.micro_id=digital.dig_id and micros.micro_id=speeds.speed_id and micros.packages=presentation.box_id and micros.memorytype=memorytype.type_id", [dato], (err, result ) => {
        return res.send(result)
    })
});

app.get("/shop", (req, res) => {
    database.query("SELECT * FROM shop", (err, result ) => {
        return res.send(result)
    })
})

app.post("/advance", (req, res) => {
    memory=req.body.Memory;
    eeprom=req.body.Eeprom;
    ram=req.body.Ram;
    pins=req.body.Pins;
    channels=req.body.Channels;
    resolution=req.body.Resolution;
    comp=req.body.Comp;
    timer8=req.body.Timer8;
    timer16=req.body.Timer16;
    serial=req.body.Serial;
    speed=req.body.Speed;
    osc=req.body.Osc;
    database.query("SELECT * FROM micros, analog, digital, speeds, memorytype, presentation where micros.micro_id=analog.adc_id and micros.micro_id=digital.dig_id and micros.micro_id=speeds.speed_id and micros.packages=presentation.box_id and micros.memorytype=memorytype.type_id and progmemory>=? and eeprom>=? and ram>=? and pins>=? and ADC>=? and res>=? and comp>=? and timer16>=? and timer8>=? and serial<>? and max>=? and intOSC>=? order by micro_id", [memory, eeprom, ram, pins, channels, resolution, comp, timer16, timer8, serial, speed, osc], (err, result ) => {
        return res.send(result)
    })
    
});

app.post("/family", (req, res) => {
    dato=req.body.name;
    database.query("SELECT * FROM micros, analog, digital, speeds, memorytype, presentation where model = ? and micros.micro_id=analog.adc_id and micros.micro_id=digital.dig_id and micros.micro_id=speeds.speed_id and micros.packages=presentation.box_id and micros.memorytype=memorytype.type_id", [dato], (err, result ) => {
        return res.send(result)
    })
});

app.post("/register", (req, res) => {
    username = req.body.username;
    password = req.body.password;
    avatar = req.body.avatar;
    database.query("INSERT INTO users (user, password, avatar) values (?,?,?)", [username, password, avatar], 
    (err, result)=>{
        if (err){
            res.send(err);
        }else {
            res.send(result);
        }
    });
})

app.post("/login", (req, res) => {
    username = req.body.username;
    database.query(
        "SELECT * FROM users WHERE user = ?", [username],
        (err, result) => {
            if (err){
                return res.send(err);
            } else {
                return res.send(result);
            }


        }

    )
})

app.listen(3001, () => {
    console.log("running on port 3001")
});