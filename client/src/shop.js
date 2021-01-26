import React, {useState} from "react";
import reactDOM, { render } from "react-dom";
import axios from "axios";
import { useTable } from 'react-table';
import "./index.css";

function Shop () {

    const [List, setList]= useState([]);
    const [i,seti] = useState(0);
    const pages = [1,2,3,4,5,6,7];
    const [cart, setcart] = useState ([""]);
    const [show, setshow] = useState (false);
    const [x, setx]= useState (1);
    const [index,setindex] = useState (0);
    const [amount,setamount] = useState (0);

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

    const addcart = (item, price) => {
        let myObj={id: index, article: item, quantity: x, price: price, total: price}
        cart[index]=(myObj);
        console.log(cart);
        setindex(index+1);
        cart.map((dato=>{
            setamount(amount+dato.total);
        }))
    }

    const seecart = () => {
        setshow(!show);
        setcart(cart);
    }

    const less = (minus) =>{
        let counting=0;
        cart[minus].quantity = cart[minus].quantity-1;
        cart[minus].total = cart[minus].quantity * cart[minus].price;
        setcart(cart);

        cart.map((dato)=>{
            counting = counting+dato.total;
        })

        setamount(counting);     
          
    }

    const more = (plus) =>{
        let counting=0;
        cart[plus].quantity = cart[plus].quantity+1;
        cart[plus].total = cart[plus].quantity * cart[plus].price;
        setcart(cart);
        
        cart.map((dato)=>{
            counting = counting+dato.total;
        })

        setamount(counting);       
    }

    return (
        <div>
            <div className={"header"}>
                <div style={{width: "85%"}}>
                    <button onClick={view}>All Products</button>
                    
                    <div style={{position: "relative"}}>
                        <button onClick={seecart}>See cart</button>
                        <div className={show ? "showon" : "showoff"} style={{position: "absolute", backgroundColor: "white"}}>
                            {cart.map((items)=>{
                                return (
                                    <div className={"header"}>
                                        <div>{items.article}</div>
                                        <div className={"header"}>
                                            <button id={items.id} onClick={(ev) => less(ev.target.id)}>-</button>
                                                <div>{items.quantity}</div>
                                            <button id={items.id} onClick={(ev) => more(ev.target.id)}>+</button>
                                        </div>
                                        <div>{items.price}</div>
                                        <div>{items.total}</div>
                                        
                                    </div>
                                )
                            })} 
                            <div>{amount}</div>
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
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id, micros.price)}>Add Cart</button></div>
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
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id, micros.price)}>Add Cart</button></div>
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
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id, micros.price)}>Add Cart</button></div>
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
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id, micros.price)}>Add Cart</button></div>
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
                                    <div><button id={micros.product}>Buy Now</button><button id={micros.product} onClick={(ev) => addcart(ev.target.id, micros.price)}>Add Cart</button></div>
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