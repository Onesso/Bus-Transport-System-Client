import Jumbo from "../components/cards/Jumbo.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.jsx";
import { Input } from "antd";
import { Modal } from "antd";
import toast from "react-hot-toast";

export default function Booking() {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint
  const location = useLocation();
  const foundData = location.state?.found || [];

  //state
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [seat, setSeat] = useState("");

  //context

  const [auth, setAuth] = useAuth();

  // Check if foundData is an empty array
  if (foundData.length === 0) {
    return (
      <>
        {" "}
        <div>
          <Jumbo
            title={"BOOKING AND CHECKOUT"}
            subTitle="Sorry No available Buses For this Route"
          />
        </div>
      </>
    );
  }

  // Access the _id property of the first element in foundData
  const firstElementId = foundData[0]._id;
  
  const fromm = foundData[0].from;
  const too = foundData[0].to;

  const name = auth?.user?.name;
  const price = foundData[0].price;
  const jina1 = from.name;
  const jina2 = to.name;

  console.log(name, price, phone, jina1, jina2, seat);

  useEffect(() => {
    loadFrom();
    loadTo();
  }, []);

  const loadFrom = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/onetravelroutes/${fromm}`
      );
      console.log(data);
      setFrom(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadTo = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/onetravelroutes/${too}`
      );
      console.log(data);
      setTo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${REACT_APP_API}/book`, {
        name,
        price,
        phone,
        jina1,
        jina2,
        seat,
      });
      if (data?.error) {
        toast.error("Booking was not Successful");
        console.log(data?.error);
      } else {
        toast.success("Booking Successful");
        setVisible(false);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Jumbo title={"BOOKING AND CHECKOUT"} />
      </div>
      <div className="row m-5">
        <div className="col-md-5">
          <img
            className="card-img-top"
            src={`${REACT_APP_API}/vehicle/photo/${firstElementId}`}
            style={{
              height: "300px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-md-7">
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th>Plate</th>
                <th>Price</th>
                <th>From</th>
                <th>To</th>
                <th>No of Seats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{foundData[0].plate}</td>
                <td>{foundData[0].price}</td>
                <td>{from.name}</td>
                <td>{to.name}</td>
                <td>{foundData[0].no_buses}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div>
            <button
              className="btn btn-outline-danger ml-1"
              style={{
                borderRadius: "5px",
                margin: "0px",
              }}
              onClick={() => {
                setVisible(true);
              }}
            >
              BOOK SEAT
            </button>

            <Modal
              title={"Personal Information"}
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <input
                type="text"
                className="form-control mb-3 p-2"
                placeholder="Enter Name"
                value={auth?.user?.name}
                disabled={true}
              />

              <input
                type="text"
                className="form-control mb-3 p-2"
                placeholder="From"
                value={from.name}
                disabled={true}
              />
              <input
                type="text"
                className="form-control mb-3 p-2"
                placeholder="To"
                value={to.name}
                disabled={true}
              />
              <input
                type="number"
                className="form-control mb-3 p-2"
                placeholder="Phone"
                value={price}
                disabled={true}
              />
              <input
                type="number"
                className="form-control mb-3 p-2"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-3 p-2"
                placeholder="Enter Seat Number"
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
              />

              <div className="col d-flex justify-content-between">
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    handleSubmit(); // Call the function
                     
                  }}
                >
                  Book
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
