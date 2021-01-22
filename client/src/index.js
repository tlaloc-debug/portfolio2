import React, {useState} from "react";
import ReactDOM from "react-dom";
import Products from "./products.js";
import Description from "./description.js";
import Shop from "./shop.js";
import logo from "./screenshot.png";
import chip from "./chip.png";
import manual from "./manual.png";
import cart from "./cart.png";

function App() {

    const [technical, settechnical] = useState(false);
    const [concept, setconcept] = useState(false);
    const [shop, setshop] = useState(false);

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

    return (
        <div>
            <div className={"header"}>
                <img src={logo} style ={{borderRadius: "15px"}} alt="logo"/><br/><br/>
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
                
                <div style={{width: "25%", height: "400px"}}>
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

            <div >
                <Shop />
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
                        <div className={"nav"}>
                            Sign in
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
