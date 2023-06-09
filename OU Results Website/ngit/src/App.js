import { useState, useRef } from "react";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";


import Info from "./components/Info";

function App() {

  document.body.style.minHeight = "768px"
  document.body.style.minWidth = "1024px"
  document.body.style.zoom = "86%";

  const [cont, setCont] = useState(0); 
  const rend = useRef(0);

  const check = async(e) => {
    rend.current = 0;
    document.getElementById("load").style.display = "block"
    document.getElementById("info").style.display = "none"

    e.preventDefault();
    const roll = document.getElementsByClassName("form-control")[0].value
    if(roll.length !== 12){
      setCont(0);
      alert("Invalid Roll Number");
      return;
    }
    var valid = await fetch(`https://ngit-results.onrender.com/${roll.substring(4,6)}/${roll}`)
    valid = await valid.json()
    if(valid.length === 0){
      setCont(0);
      document.getElementById("load").style.display = "none"
      alert("Invalid Roll Number");
      return;
    }else{
      if(cont !== 0){
        setCont(cont+1);
      }
      else setCont(1)
    }
    
  }

  const main = {
    width: '90%',
    height: '90%',
    margin: '0 auto'
  }

  return (
    <div className="container" style={main}>
      <div style={{width: "40%", margin: "1em auto", minWidth: "420px"}}>
        <input type="text" className="form-control" placeholder="Enter RollNumber" style={{width: "80%", float: "left"}}/>
        <button className="btn btn-info" style={{marginLeft: "2%", width: "18%", color: "white"}} onClick={(e) => check(e)}>Submit</button>
      </div>
      <p style={{textAlign: "center", fontSize: "20px", display: "none"}} id="load">Loading....</p>
      <div id="info">
      {cont !== 0 ? <Info render = {rend} year = {document.getElementsByClassName("form-control")[0].value.substring(4,6)} roll = {document.getElementsByClassName("form-control")[0].value}/>:''}
      </div>
    </div>
  );
}

export default App;
