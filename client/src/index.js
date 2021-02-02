import React, {useState} from "react";
import ReactDOM from "react-dom";
import Products from "./products.js";
import Description from "./description.js";
import Shop from "./shop.js";
import Checkout from "./checkout.js";
import logo from "./screenshot.png";
import chip from "./chip.png";
import manual from "./manual.png";
import cart from "./cart.png";
import Axios from "axios";
import avatar1 from "./avatar1.jpeg";
import avatar2 from "./avatar2.jpeg";
import avatar3 from "./avatar3.jpeg";
import avatar4 from "./avatar4.jpeg";

function App() {

    const initialsesionsave = JSON.parse(localStorage.getItem("savesesion")) || [""];

    const [technical, settechnical] = useState(false);
    const [concept, setconcept] = useState(true);
    const [shop, setshop] = useState(false);
    const [checkout, setcheckout] = useState(false);

    const technicalclick = () => {
        settechnical(true);
        setconcept(false);
        setshop(false);
    }

    const conceptclick = () => {
        settechnical(false);
        setconcept(true);
        setshop(false);
    }

    const shopclick = () => {
        settechnical(false);
        setconcept(false);
        setshop(true);
    }

    const [userNameReg, setuserNameReg] = useState ("");
    const [passReg, setpassReg] = useState ("");
    const [responseReg, setresponseReg] = useState("null");

    const [userName, setuserName] = useState ("");
    const [pass, setpass] = useState ("");
    const [response, setresponse] = useState ("null");

    const [user, setuser] = useState (initialsesionsave.usersave || "");
    const [sesion, setsesion] = useState (initialsesionsave.sesionsave || false);
    const [inputs, setinputs] = useState (initialsesionsave.inputssesion || false);
    const [inputsReg, setinputsReg] = useState (false);
    const [image, setimage] = useState ("");
    const [imageRes, setimageRes] = useState (initialsesionsave.imagensesion || "");
    const cuadro = ["", avatar1, avatar2, avatar3, avatar4];
    

    const register = () => {
        Axios.post("http://localhost:3001/register", {username: userNameReg, password: passReg, avatar: image}).then((response)=>setresponseReg(JSON.stringify(response)));
    }

    const login = () => {
        Axios.post("http://localhost:3001/login", {username: userName, password: pass}).then((response)=>setresponse(JSON.stringify(response.data)));
        console.log(response);    
    }

    const IsRegister = () => {
        if (responseReg.indexOf('"affectedRows":1')>0){
            setinputsReg(false);
            return <div><p>You have successfully registered.</p></div>
        } else {
            if (responseReg.indexOf("Duplicate")>0) {
                return <div><p>Seems like somebody already have this username.</p></div>
            } else {
                return null;
            } 
        }
    }

    const IsLogin = () => {
        console.log(response);
        if (response=="null") {
            return null;
        } else { 
            if (response.indexOf("user")>0) {
                setuser(userName);
                setsesion(true);
                setinputs(false);
                setimageRes(response.substr(response.indexOf("avatar")+9,1));
                let myObj={usersave: userName, sesionsave: true, inputssesion: false, imagensesion: imageRes}
                localStorage.setItem("savesesion", JSON.stringify(myObj));
                return <div><p>Welcome back!</p></div>
            } else {
                
            return <div><p>Wrong username or password.</p></div>
            
            }
        }
    }

    const seeinputs = () => {
        setinputs(true);
    }

    const seeinputsReg = () => {
        setinputsReg(true);
    }

    const logout = () => {
        let myObj={usersave: "", sesionsave: false, inputssesion: false, imagensesion: ""}
        localStorage.setItem("savesesion", JSON.stringify(myObj));
        window.location.reload();  
    }

    const actioncancel = () => {
        setinputs(false);
        setinputsReg(false);
    }

    return (
        <div>
            <div className={"header"} style={{position: "relative"}}>
            <img src={logo} style ={{borderRadius: "15px"}} alt="logo"/><br/><br/> 

                <div className={sesion ? "sesionoff" : "sesionon"} style={{position: "absolute", width: "100%"}}> 
                    <div style={{width: "30%", marginLeft: "0px"}} className={"header"}>
                        <button style ={{marginTop: "45px"}} onClick={seeinputs}>Log in</button>
                        <button style ={{marginTop: "45px"}} onClick={seeinputsReg}>Register</button>
                    </div>
                </div>
                    

                <div className={inputs ? "inputson" : "inputsoff"} style={{backgroundColor: "white", padding: "30px 30px", boxShadow: "5px 10px 18px #888888"}} >
                    <div className={"header"}>
                        <div>
                            <label style={{display: "block", padding: "8px"}}>uername</label>
                            <label style={{display: "block", padding: "8px"}}>password</label>
                        </div>
                        <div>
                            <input  type="text" onChange={(ev)=>{setuserName(ev.target.value)}}/><br/>
                            <input  type="text" onChange={(ev)=>{setpass(ev.target.value)}}/>
                            <br/><br/>
                            <button onClick={login}>Log in</button>
                            <button onClick={actioncancel}>Cancel</button>
                        </div>
                    </div>
                    <IsLogin />
                </div>

                <div className={inputsReg ? "inputsRegon" : "inputsRegoff"} style={{backgroundColor: "white", padding: "30px 30px", boxShadow: "5px 10px 18px #888888"}}>
                    <div className={"header"}>
                        <div>
                            <label style={{display: "block", padding: "8px"}}>uername</label>
                            <label style={{display: "block", padding: "8px"}}>password</label>
                        </div>
                        <div>  
                            <input type="text" onChange={(ev)=>{setuserNameReg(ev.target.value)}}/><br/>
                            <input type="text" onChange={(ev)=>{setpassReg(ev.target.value)}}/>
                            <br/><br/> 
                        </div> 
                    </div>   
                    <div className={"header"}><div>Chose your Avatar</div></div> 
                    <br/>
                    <div className={"header"}>
                        <img className={"avatar"} src={avatar1}/>
                        <input type="radio" name="select" onChange={(event)=>(setimage(1))}/>
                        <img className={"avatar"} src={avatar2}/>
                        <input type="radio" name="select" onChange={(event)=>(setimage(2))}/>
                        <img className={"avatar"} src={avatar3}/>
                        <input type="radio" name="select" onChange={(event)=>(setimage(3))}/>
                        <img className={"avatar"} src={avatar4}/>
                        <input type="radio" name="select" onChange={(event)=>(setimage(4))}/>                       
                    </div>
                    <br/>
                    <div className={"header"}>
                        <button onClick={register}>Register</button><br/><br/>
                        <button onClick={actioncancel}>Cancel</button>
                    </div>
                    <IsRegister />
                </div>
                

                <div className={sesion ? "sesionon" : "sesionoff"} style={{position: "absolute", width: "100%"}}>
                    <div style={{width: "30%", marginLeft: "0px"}} className={"header"}>
                        <div>
                            <h3 style={{margin: "0px"}}>Welcome back!</h3> 
                            <img src={cuadro[imageRes]} alt="" style={{height: "30px"}} /><h3 style={{display: "inline-block"}}>{user}</h3>
                            <button onClick={logout}>Log out</button>
                        </div>
                    </div> 
                </div>

            </div>

            <div className={"header"}>
                <div style={{width: "80%", height: "100px", margin: "10px 0px"}}><p style={{fontFamily: "monospace", fontSize: "2em", margin: "0px"}}> choseyourpic.com is a site that allows you to select the correct microcontroller for your project by listing the specifications of almost all available microcontroller in the market.   </p ></div>
            </div>

            <div className={"header"}>
                <div style={{width: "25%", height: "400px"}} onClick={technicalclick}>
                    <div className={"header"}>
                        <div style={{width: "90%", height: "10px", backgroundColor: "#f68d2e"}}></div>
                    </div>

                    <div style={{width: "100%", height: "270px"}}>
                            <img style={{display: "block", margin: "auto", paddingTop: "30px"}} src={chip} alt=""/>
                    </div>
                    
                    <div style={{width: "100%", height: "50px", textAlign: "center"}}> Technical</div>
                    <div style={{width: "100%", height: "70px", textAlign: "center"}}> Search for an specific Item or make an Advanced Search to find what Pic meets your criteria</div>
                </div>

                <div style={{width: "25%", height: "400px"}} onClick={conceptclick}>
                    <div className={"header"}>
                        <div style={{width: "90%", height: "10px", backgroundColor: "#41b6e6"}}></div>
                    </div>

                    <div style={{width: "100%", height: "270px"}}>
                            <img style={{display: "block", margin: "auto", paddingTop: "30px"}} src={manual} alt=""/>
                    </div>
                    
                    <div style={{width: "100%", height: "50px", textAlign: "center"}}> Manual</div>
                    <div style={{width: "100%", height: "70px", textAlign: "center"}}> Find a quick description about some terms like RAM, ADC, etc. </div>
                </div>
                
                <div style={{width: "25%", height: "400px"}} onClick={shopclick}>
                    <div className={"header"}>
                        <div style={{width: "90%", height: "10px", backgroundColor: "#6cc24a"}}></div>
                    </div>

                    <div style={{width: "100%", height: "270px"}}>
                            <img style={{display: "block", margin: "auto", paddingTop: "30px"}} src={cart} alt=""/>
                    </div>
                    
                    <div style={{width: "100%", height: "50px", textAlign: "center"}}> Shop</div>
                    <div style={{width: "100%", height: "70px", textAlign: "center"}}> Check which items are currently available to order. </div>
                </div>
            </div>

            <div className={technical ? "technicalon" : "technicaloff"}>
                <Products />
            </div>

            <div className={concept ? "concepton" : "conceptoff"}>
                <Description />
            </div>

            <div className={shop ? "shopon" : "shopoff"}>
                <Shop />
            </div>

            <div className={checkout ? "checkouton" : "checkoutoff"}>
                <Checkout />
            </div>            

            <div className={"header"}>
                <div style={{width: "85%", backgroundColor: "#001122"}}>
                    <div className={"header"}>
                        <div className={"nav"}>
                            Software
                        </div>
                        <div className={"nav"}>
                            Contact
                        </div>
                        <div className={"nav"}>
                            About Us
                        </div>
                        <div className={"nav"} onClick={seeinputsReg}>
                            Register
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
