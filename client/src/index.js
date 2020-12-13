import react, {useState} from "react";
import reactDOM from "react-dom";
import axios from "axios";
import "./index.css"

function App() {

    const [List, setList]= useState([]);

    const search = () => {
        axios.get("http://localhost:3001/micros").then((response) => {
            setList(response.data)
        }); 
    }

    const rendermicros = (micros) => {
        return (
            <tr>
                <td>{micros.product}</td>
                <td>{micros.progmemory}</td>
            </tr>
        )
    }

    return (
        <div>
            <button onClick={search}>Search</button>
            <thead>
                <tr>
                    <td>micro</td>
                    <td>memory</td>
                </tr>
            </thead>
            <tbody>
                {List.map(rendermicros)}
            </tbody>
        </div>
    );
}

reactDOM.render(<App />, document.getElementById("root"));