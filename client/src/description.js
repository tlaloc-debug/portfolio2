import React, {useState} from "react";
import ReactDOM from "react-dom";
import blocks from './blocks.png';
import pic from "./pic.png";
import './index.css';
import ReactImageMagnify from 'react-image-magnify';
import lcd from "./lcd.png";

class Description extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            x: 0,
            y: 0,
            position: true
          }
          
        this.onMouseMove = this.onMouseMove.bind(this);
        
        this.imageProps = {
          enlargedImageContainerDimensions: {width: "200%", height: "200%"},
            smallImage: {
                alt: '',
                isFluidWidth: true,
                src: blocks,
            },

            largeImage: {
                src: blocks,
                width: 800,
                height: 800,
            },
            enlargedImageContainerStyle: { background: "black" }
        }

    }

    onMouseMove(e) {
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, position: !this.state.position});
      }

   

    render (){
      const {x, y, position} = this.state;
      var text;
      var head;
        if (x>16 && x<30 && y>12 && y<20){
            head="ADC (Analog-Digital Converter)";
            text="Description missing...";
        }
        if (x>35 && x<50 && y>15 && y<20){
          head="RES (Resolution)";
          text="Description missing...";
        }
        if (x>65 && x<82 && y>25 && y<32){
          head="Timer";
          text="Description missing...";
        }
        if (x>15 && x<30 && y>38 && y<45){
          head="Memory";
          text="Description missing...";
        }
        if (x>35 && x<50 && y>38 && y<45){
          head="RAM (Random Acces Memory)";
          text="Description missing...";
        }
        if (x>88 && x<104 && y>50 && y<58){
          head="Max Speed (Maximun Speed)";
          text="Description missing...";
        }
        if (x>86 && x<104 && y>72 && y<80){
          head="IntOSC (Internal Oscilator)";
          text="Description missing...";
        }
        if (x>65 && x<82 && y>84 && y<192){
          head="EEPROM (Electricaly Programable Memory)";
          text="Description missing...";
        }
        if (x>65 && x<82 && y>96 && y<102){
          head="Serial Comm (Serial Communication)";
          text="Description missing...";
        }
        if (x>36 && x<52 && y>108 && y<115){
          head="Comp (Comparator)";
          text="Description missing...";
        }
        if (x>15 && x<104 && y>138 && y<146){
          head="I/O Pins (Input/Output Pins)";
          text="Description missing...";
        }

        return (
          <div>
            <div className={"header"}>

              <div style={{width: "1000px", height: "400px", display: "flex", justifyContent: "space-around"}}> 
                <div style={{width: "150px", display: "flex"}}>
                    
                  <div style={{position: "relative", alignItems: "center"}}> 
                    <img src={pic} alt="" style={{position: "absolute", width: "150", marginTop: "40px"}}/>                           
                    <a className={"effect"} onClick={this.onMouseMove}>
                      <ReactImageMagnify {...this.imageProps} className={"vanish"} style={{position: "absolute", margin: "100px 10px"}}/>
                    </a>
                  </div>
                   
                </div>

                <div style={{width: "500px", position: "relative", zIndex: -1}}>

                  <img src={lcd} alt="" style={{width: "500px", position: "absolute"}}/>
                  <div style={{position: "absolute", marginLeft: "45px", marginTop: "80px", height: "140px", width: "400px"}}>
                    <h3>{head}</h3>
                    <p>{text}</p>
                  </div>

                  <div style={{position: "absolute", height: "40px", width: "300px", marginLeft: "150px", marginTop: "300px", backgroundColor: "blue", zIndex: -1}}>
                    <div className={position ?  "transleft" : "transrigth"} style={{backgroundColor: "red", width: "20px", height: "40px"}}></div>
                  </div>
                </div>

              </div>
            </div>
            {/*<h1>{x} {y}</h1>*/} 

          </div>
        );

    }
}

export default Description;