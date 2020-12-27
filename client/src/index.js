import React, {useState} from "react";
import reactDOM from "react-dom";
import axios from "axios";
import { useTable } from 'react-table';
import "./index.css";

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
  )
  
  function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      allColumns,
      getToggleHideAllColumnsProps,
      state,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <>
        <div>
          <table>
            <tr>
              <td>   
                <div>
                  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
              </td>  
            </tr>

          <tr>
          {allColumns.slice(1,8).map(column => (
            //key={column.id} se usa para evitar mensaje de error
            <td>
            <div key={column.id} > 
                <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}{column.id}
            </div>
            </td>
          ))}
          </tr>
          
          <tr>
          {allColumns.slice(8,15).map(column => (
            //key={column.id} se usa para evitar mensaje de error
            <td>
            <div key={column.id} style={{display: "inline"}}> 
                <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}{column.id}
            </div>
            </td>
          ))}
          </tr>
          </table>  
          <br />


        </div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                    </tr>
                  ))}
            </thead>
  
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
  
        </table>     
      </>
    )
  }


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

    const columns =  [
      {
        Header: "General", 
        columns: [
          {Header: 'Product', accessor: 'product'},
          {Header: 'Memory', accessor: 'progmemory'},
          {Header: 'Memory_Type', accessor: 'memtype'},
          {Header: 'EEprom', accessor: 'eeprom'},
          {Header: 'RAM', accessor: 'ram'},
          {Header: 'I/O_Pins', accessor: 'pins'},
          {Header: 'Packages', accessor: 'box'}
        ]},
      {
        Header: "Analog", 
        columns: [
          {Header: 'ADC', accessor: 'ADC'},
          {Header: 'Res', accessor: 'res'}
        ]},
      {
        Header: "Digital", 
        columns: [
          {Header: 'Comp', accessor: 'comp'},
          {Header: '16bit', accessor: 'timer16'},
          {Header: '8bit', accessor: 'timer8'},
          {Header: 'Serial_ Comm', accessor: 'serial'}
        ]},
      {
        Header: "Clock", 
        columns: [    
          {Header: 'Max_Speed', accessor: 'max'},
          {Header: 'IntOSC', accessor: 'intOSC'},
        ]},  
      ];
    
    const data=List;

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

            <Table columns={columns} data={data} />
        </div>
    );
}

reactDOM.render(<App />, document.getElementById("root"));