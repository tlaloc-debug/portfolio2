import React, {useState} from "react";
import reactDOM, { render } from "react-dom";
import axios from "axios";
import { useTable } from 'react-table';
import "./index.css";

function Shop () {

    const [List, setList]= useState([]);
    const [i,seti] = useState(0);
    const pages = [1,2,3,4,5,6,7];
    const cart = [{article: "item", quantity: 2}];
    const [show, setshow] = useState (false);
    const [x, setx]= useState (1);
    let index=0;

    const view = () => {
        axios.get("http://localhost:3001/shop").then((response) => {
            setList(response.data)
        }); 
    }

    const previouspage = () => {
        seti(i-25);
    }

    const nextpage = () => {
        seti(i+25);
    }

    const pagination = (number) => {
        seti((number-1)*25)
    }

    const addcart = (item) => {
        let myObj={article: item, quantity: x};
        cart[index]=(myObj);
        console.log(cart);
        index=index+1;
        
    }

    const seecart = () => {
        setshow(!show);
    }

    const restar = () =>{
        setx(x-1);
    }

    const sumar = () =>{
        setx(x+1);
    }

    return (
        <div>
            <div className={"header"}>
                <div style={{width: "85%"}}>
                    <button onClick={view}>All Products</button>
                    <div >
                        <button onClick={restar}>-</button>
                        <div>{x}</div>
                        <button onClick={sumar}>+</button>
                    </div>
                    <div style={{position: "relative"}}>
                        <button onClick={seecart}>See cart {}</button>
                        <div className={show ? "showon" : "showoff"} style={{position: "absolute"}}>
                            
                        </div>
                    </div>
                    <div className={"gallery"}>
                        {List.slice(i,i+5).map((micros, key) => {
                        return (
                            <div> 
                                <div >
                                    <div className={"galleryelement"}>{micros.product}
                                    <div className={"galleryelement"}> {micros.price}</div>
                                    <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div>
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id)}>Add Cart</button></div>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={"gallery"}>
                        {List.slice(i+5,i+10).map((micros, key) => {
                        return (
                            <div> 
                                <div  >
                                    <div className={"galleryelement"}>{micros.product}
                                    <div className={"galleryelement"}> {micros.price}</div>
                                    <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div>
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id)}>Add Cart</button></div>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={"gallery"}>
                        {List.slice(i+10,i+15).map((micros, key) => {
                        return (
                            <div> 
                                <div  >
                                    <div className={"galleryelement"}>{micros.product}
                                    <div className={"galleryelement"}> {micros.price}</div>
                                    <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div>
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id)}>Add Cart</button></div>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={"gallery"}>
                        {List.slice(i+15,i+20).map((micros, key) => {
                        return (
                            <div> 
                                <div  >
                                    <div className={"galleryelement"}> {micros.product}
                                    <div className={"galleryelement"}> {micros.price}</div>
                                    <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div>
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id)}>Add Cart</button></div>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={"gallery"}>
                        {List.slice(i+20,i+25).map((micros, key) => {
                        return (
                            <div> 
                                <div  >
                                    <div className={"galleryelement"}>{micros.product}
                                    <div className={"galleryelement"}> {micros.price}</div>
                                    <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div>
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id)}>Add Cart</button></div>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>
                    
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button onClick={previouspage}> previous page</button>
                        {pages.map((page) => {
                            return <button id={page} onClick={(ev) => pagination(ev.target.id)} style={{padding: "0px 10px"}}>{page}</button>
                        })}
                        <button onClick={nextpage}>next page</button>
                    </div>

                </div>
            </div>
        </div>
        
    );
}

export default Shop;