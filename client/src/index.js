import react, {useState} from "react";
import reactDOM from "react-dom";
import axios from "axios";
import "./index.css"

function App() {

    const [Pic, setPic]=useState(""); 
    const [memory, setmemory]=useState(0);
    const [eeprom, seteeprom]=useState(0);
    const [ram, setram]=useState(0);
    const [pins, setpins]=useState(0);
    const [channels, setchannels]=useState(0);
    const [resolution, setresolution]=useState(0);
    const [comp, setcomp]=useState(0);
    const [timer8, settimer8]=useState(0);
    const [timer16, settimer16]=useState(0);
    const [serial, setserial]=useState("yes");
    const [speed, setspeed]=useState(0);
    const [osc, setosc]=useState(0);
    const [List, setList]= useState([]);
    const [visible, setvisible]=useState(true);

    const [flip, setflip]=useState(true);

    const search = () => {
        axios.post("http://localhost:3001/search", {name: Pic});
        axios.get("http://localhost:3001/ressearch").then((response) => {
            setList(response.data)
        }); 
        if (visible===true) setvisible(!visible);
    }

    const advance = () => {
        axios.post("http://localhost:3001/advance",
            {Memory: memory,
            Eeprom: eeprom,
            Ram: ram,
            Pins: pins,
            Channels: channels, 
            Resolution: resolution,
            Comp: comp,
            Timer8: timer8,
            Timer16: timer16,
            Serial: serial,
            Speed: speed,
            Osc: osc      
        });
        axios.get("http://localhost:3001/resadvance").then((response) => {
            setList(response.data)
        }); 
        if (visible===true) setvisible(!visible);
    }

    const change = () => {
        setflip(!flip);
    }

    const rendermicros = (micros) => {
        return (
            <tr>
                <td>{micros.product}</td>
                <td>{micros.progmemory}</td>
                <td>{micros.memtype}</td>
                <td>{micros.eeprom}</td>
                <td>{micros.ram}</td>
                <td>{micros.pins}</td>
                <td>{micros.box}</td>
                <td>{micros.ADC} X {micros.res} bites</td>
                <td>{micros.comp}</td>
                <td>{micros.timer16}-16 bits, {micros.timer8}-8 bits</td>
                <td>{micros.serial}</td>
                <td>{micros.max}</td>
                <td>{micros.intOSC}</td>
            </tr>
        )
    }

    return (
        <div>
            <div className={flip ? "flip-card" : "flip-card-after"}>
                <div className={flip ? "flip-card-inner" : "flip-card-inner-after"}>
                    <div class="flip-card-front">
                        <input type="text" onChange={(event)=>(setPic(event.target.value))}/>
                        <button onClick={search}>Search</button><br/><br/>
                        <button onClick={change} style={{border: "none"}}>Advance Search</button>
                    </div>
                    <div class="flip-card-back">
                    <table>
                    <tr>
                        <td style={{border: "none"}}>
                            <label htmlFor="">Memory:</label><br/>
                            <input type="text" onChange={(event)=>(setmemory(event.target.value))}/><br/><br/>
                            <label htmlFor="">EEprom:</label><br/>
                            <input type="text" onChange={(event)=>(seteeprom(event.target.value))}/><br/><br/>
                            <label htmlFor="">RAM:</label><br/>
                            <input type="text" onChange={(event)=>(setram(event.target.value))}/><br/><br/>
                            <label htmlFor="">I/O Pins:</label><br/>
                            <input type="text" onChange={(event)=>(setpins(event.target.value))}/><br/><br/>
                        </td>
                        <td style={{border: "none"}}> 
                            <label htmlFor="">ADC</label><br/><br/>
                            <label htmlFor="">Chanels:</label><br/>
                            <input type="text" onChange={(event)=>(setchannels(event.target.value))}/><br/>
                            <label htmlFor="">Resolution:</label><br/>
                            <input type="text" onChange={(event)=>(setresolution(event.target.value))}/><br/><br/>
                            <label htmlFor="">Comparator</label><br/>
                            <input type="radio" name="select" defaultChecked onChange={(event)=>(setcomp(0))}/>
                            <label htmlFor="">0</label><br/>
                            <input type="radio" name="select" onChange={(event)=>(setcomp(1))}/>
                            <label htmlFor="">1</label><br/>
                            <input type="radio" name="select" onChange={(event)=>(setcomp(2))}/>
                            <label htmlFor="">2</label><br/>
                        </td>
                        <td style={{border: "none"}}>
                            <label htmlFor="">Timers</label><br/>
                            <input type="checkbox" onChange={(event)=>(settimer8(1))}/>
                            <label htmlFor="">8-bit</label><br/>
                            <input type="checkbox" onChange={(event)=>(settimer16(1))}/>
                            <label htmlFor="">16-bit</label><br/><br/>
                            <input type="checkbox" onChange={(event)=>(setserial("no"))}/>
                            <label htmlFor="">Serial Comm</label><br/><br/>
                            <label htmlFor="">Max Speed</label><br/>
                            <input type="text" onChange={(event)=>(setspeed(event.target.value))}/><br/><br/>
                            <input type="checkbox" onChange={(event)=>(setosc(1))}/>
                            <label htmlFor="">Internal OSC</label><br/><br/>
                        </td>
                    </tr>
                </table>   
                <button onClick={advance}>Advance</button> <br/><br/>
                <button onClick={change} style={{border: "none"}}>Normal Search</button>
                    </div>
                </div>
            </div>

            
            <div>
                
            </div>
            <div className={visible ? "showoff" : "showon"}>
            <thead> 
                <tr >
                    <td>Product</td>
                    <td>Memory</td>
                    <td>Memory_Type</td>
                    <td>EEprom</td>
                    <td>RAM</td>
                    <td>I/O_Pins</td>
                    <td>Packages</td>
                    <td>A/D_COnverter</td>
                    <td>Comp</td>
                    <td>Timer</td>
                    <td>Serial_COmm</td>
                    <td>Max_Speed</td>
                    <td>IntOSC</td>
                </tr>
            </thead>
            <tbody>
                {List.map(rendermicros)}
            </tbody>
            </div>
        </div>
    );
}

reactDOM.render(<App />, document.getElementById("root"));