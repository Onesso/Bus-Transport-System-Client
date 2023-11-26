import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Jumbo from "../components/cards/Jumbo";
import { useAuth } from "../context/auth.jsx";
import { Badge } from "antd";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routes, setRoutes] = useState([]);
  const [found, setFound] = useState([]);

  //context
  const [auth, setAuth] = useAuth();

  //navigate
  const navigate = useNavigate();

  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  useEffect(() => {
    loadRoutes();
  }, []);

  // accesssing all the routes from the db
  const loadRoutes = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API}/travelroutes`);
      console.log(data);
      setRoutes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterRoute = async () => {
    try {
      const { data } = await axios.post(`${REACT_APP_API}/filter`, {
        from,
        to,
      });
      console.log("Information receivied from the serve: ", data);
      if (data?.error) {
        toast.error("Trip not Availabe");
        console.log(error);
      } else {
        setFound(data);
        toast.success("Trip available");
        navigate("/booking", { state: { found: data } });
        // navigate("/booking");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Jumbo subTitle={`Welcome back ${auth?.user?.name}`} />
      </div>

      <div className="row" style={{ marginBottom: "50px" }}>
        <div className="container">
          <ul className="d-flex justify-content-center mt-3">
            {/* used andt select to display the categories */}
            <Select
              // select from
              bordered={false}
              size="large"
              placeholder="Select From"
              className="form-select mb-3 form-control"
              onChange={(value) => setFrom(value)}
            >
              {routes?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* used andt select to display the categories */}
            <Select
              // showSearch
              bordered={false}
              size="large"
              placeholder="Select To"
              className="form-select mb-3 form-control ml-1"
              onChange={(value) => setTo(value)}
            >
              {routes?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <button
              className="btn btn-outline-danger ml-1"
              style={{
                borderRadius: "10px",
                padding: "5px",
                paddingTop: "0px",
              }}
              onClick={filterRoute}
            >
              Search
            </button>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="container">
          <h2 className="d-flex align-item-center justify-content-center">
            {" "}
            Top Destinations
          </h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-3 m-2 hoverable d-flex">
                <Badge.Ribbon text="Migori"  color="magenta">
                  {/* Image 1 */}
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/vehicle/photo/65593b07fcc0da139ef2c304`}
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-3 m-2 hoverable d-flex">
                <Badge.Ribbon text="Nairobi"  color="magenta">
                  {/* Image 2 */}
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/vehicle/photo/655939d6fcc0da139ef2c2c8`}
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-3 m-2 hoverable d-flex">
                <Badge.Ribbon text="Malaba"  color="magenta">
                  {/* Image 3 */}
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/vehicle/photo/65593a17fcc0da139ef2c2d8`}
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card mb-3 m-2 hoverable d-flex">
                <Badge.Ribbon text="Kisumu"  color="magenta">
                  {/* Image 4 */}
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/vehicle/photo/65593a43fcc0da139ef2c2db`}
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-3 m-2 hoverable d-flex">
                <Badge.Ribbon text="Homa Bay"  color="magenta">
                  {/* Image 5 */}
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/vehicle/photo/65593787fcc0da139ef2c29d`}
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-3 m-2 hoverable d-flex">
                <Badge.Ribbon text="Siaya"  color="magenta">
                  {/* Image 6 */}
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/vehicle/photo/65593aaafcc0da139ef2c2f0`}
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
