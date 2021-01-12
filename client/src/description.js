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
          enlargedImageContainerDimensions: {width: '150%', height: '150%'},
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
        if (x>20 && x<40 && y>20 && y<30){
            head="ADC (Analog-Digital Converter)";
            text="Description missing...";
        }
        if (x>50 && x<80 && y>20 && y<30){
          head="RES (Resolution)";
          text="Description missing...";
        }
        if (x>100 && x<120 && y>40 && y<50){
          head="Timer";
          text="Description missing...";
        }
        if (x>20 && x<45 && y>50 && y<70){
          head="Memory";
          text="Description missing...";
        }
        if (x>50 && x<80 && y>50 && y<70){
          head="RAM (Random Acces Memory)";
          text="Description missing...";
        }
        if (x>130 && x<150 && y>70 && y<80){
          head="Max Speed (Maximun Speed)";
          text="Description missing...";
        }
        if (x>120 && x<150 && y>100 && y<120){
          head="IntOSC (Internal Oscilator)";
          text="Description missing...";
        }
        if (x>95 && x<120 && y>120 && y<140){
          head="EEPROM (Electricaly Programable Memory)";
          text="Description missing...";
        }
        if (x>95 && x<120 && y>140 && y<160){
          head="Serial Comm (Serial Communication)";
          text="Description missing...";
        }
        if (x>50 && x<80 && y>150 && y<170){
          head="Comp (Comparator)";
          text="Description missing...";
        }
        if (x>20 && x<200 && y>200 && y<220){
          head="I/O Pins (Input/Output Pins)";
          text="Description missing...";
        }

        return (
            <div > 
                               
                <div style={{width: "1200px", height: "400px", display: "flex", justifyContent: "space-around"}}> 
                  <div style={{width: "15%", display: "flex"}}>
                    
                    <div style={{position: "relative", alignItems: "center"}}> 
                    <img src={pic} alt="" style={{position: "absolute", width: "100%", marginTop: "40px"}}/>                           
                      <a onClick={this.onMouseMove}>
                      <ReactImageMagnify {...this.imageProps} className="vanish" style={{ height: "100%", position: "absolute", margin: "50% 10%"}}/>
                      </a>

                    </div>
                   
                    
                  </div>
                    <div style={{width: "50%", position: "relative", zIndex: -1}}>
                      <img src={lcd} alt="" style={{width: "100%", position: "absolute"}}/>
                      <div style={{position: "absolute", marginLeft: "10%", marginTop: "15%", marginRight: "10%", marginBottom: "15%"}}>
                        <h3>{head}</h3>
                        <p>{text}</p>
                      </div>
                      <div style={{position: "absolute", height: "40px", width: "350px", marginLeft: "30%", marginTop: "60%", marginRight: "0%", backgroundColor: "blue", zIndex: -1}}>
                        <div className={position ?  "transleft" : "transrigth"} style={{backgroundColor: "red", width: "20px", height: "100%"}}>

                        </div>
                      </div>
                  </div>

                </div>
                <h1>{x} {y}</h1>
                

            </div>
          );

    }
}

export default Description;