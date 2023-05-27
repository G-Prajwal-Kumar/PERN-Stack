import { Fragment, useEffect } from "react";
import Carousel from "./Carousel";


const Info = (props) => {

    const check = (opt) => {
        var x = document.getElementsByClassName("checkLeft");
        var y = document.getElementsByClassName("btn-outline-secondary");
        if(opt === 1){
            y[1].style.backgroundColor = "white"
            y[1].style.color = "black"
            y[0].style.backgroundColor = "#cff4fc"
            y[0].style.color = "black"
            x[0].style.marginLeft = "0%";
        }else{  
            y[1].style.backgroundColor = "#cff4fc"
            y[1].style.color = "black"
            y[0].style.backgroundColor = "white"
            y[0].style.color = "black"
            x[0].style.marginLeft = "-100%";
        }
    }
        
    useEffect(() => {
        var y = document.getElementsByClassName("btn-outline-secondary");
        y[1].style.backgroundColor = "white"
        y[1].style.color = "black"
        y[0].style.backgroundColor = "#cff4fc"
        y[0].style.color = "black"
    })

    return (
        <Fragment>
            <Carousel year = {props.year} roll = {props.roll}/>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{width: "30%", left: "50%", marginLeft: "-15%", marginTop: "-1%"}}>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onClick={() => check(1)}/>
                <label className="btn btn-outline-secondary" htmlFor="btnradio1">Semester Results</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onClick={() => check(2)}/>
                <label className="btn btn-outline-secondary" htmlFor="btnradio2">Attempts History</label>
            </div>
        </Fragment>
    )
}

export default Info;