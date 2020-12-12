import react, {useState} from "react";
import reactDOM from "react-dom";
import axios from "axios";

function App() {

    const [List, setList]= useState([]);

    const search = () => {
        axios.get("http://localhost:3001/micros").then((response) => {
            setList(response.data)
        }); 
    }

    return (
        <div>
            <button onClick={search}>Search</button>
            {List.map(micros => (<p>{micros.product}</p>))}
        </div>
    );
}

reactDOM.render(<App />, document.getElementById("root"));