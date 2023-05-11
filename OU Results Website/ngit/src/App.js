import { useState } from "react";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";


import Info from "./components/Info";

function App() {

  document.body.style.zoom = "86%";

  const [cont, setCont] = useState(false); 
  const check = async(e) => {
    e.preventDefault();
    const roll = document.getElementsByClassName("form-control")[0].value
    if(roll.length !== 12){
      setCont(false);
      alert("Invalid Roll Number");
      return;
    }
    var valid = await fetch(`http://localhost:5000/${roll.substring(4,6)}/${roll}`)
    valid = await valid.json()
    if(valid.length === 0){
      setCont(false);
      alert("Invalid Roll Number");
      return;
    }else{
      setCont(true);
    }
  }

  return (
    <div className="container">
      <div style={{marginTop: "1em", marginBottom: "1em", width: "40%", marginLeft: "30%"}}>
        <input type="text" className="form-control" placeholder="Enter RollNumber" style={{width: "80%", float: "left"}}/>
        <button className="btn btn-info" style={{marginLeft: "2%", width: "18%", color: "white"}} onClick={(e) => check(e)}>Submit</button>
      </div>
      {cont === true ? <Info />:''}
    </div>
  );
}

export default App;
