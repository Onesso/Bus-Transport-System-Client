import Jumbo from "../components/cards/Jumbo.jsx";
import VehicleCard from "../components/cards/VehicleCard.jsx";
import { useState, useEffect } from "react";
import axios from "axios";




export default function Gallary() {

  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  //state
  const[vehicles, setVehicles] = useState([]);

  useEffect(()=>{
    loadvehicles()
  },[]);
  
  const loadvehicles = async(e) => {
  
    try{
      const { data } = await axios.get(`${REACT_APP_API}/fleet`);
      console.log("gallary requested data from server",data);
      setVehicles(data);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <Jumbo subTitle="photos of available buses and top destinations" />
      </div>

      <div className="row">
        {vehicles?.map((p) => (
          <div className="col-md-4" key={p._id}>
            <VehicleCard p={p} />
          </div>
        ))}
      </div>
    </>
  );
}
