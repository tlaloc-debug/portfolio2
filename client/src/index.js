import react, {useState} from "react";
import reactDOM from "react-dom";
import axios from "axios";
import "./index.css"

function App() {

    const [Pic, setPic]=useState(1); 
    const [List, setList]= useState([]);

    const search = () => {
        axios.post("http://localhost:3001/user", {name: Pic});
        axios.get("http://localhost:3001/user").then((response) => {
            setList(response.data)
        }); 
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
            <input type="number" onChange={(event)=>(setPic(event.target.value))}/>
            <button onClick={search}>Search</button>
            <thead>
                <tr>
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
    );
}

reactDOM.render(<App />, document.getElementById("root"));