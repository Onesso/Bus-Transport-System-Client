import AdminMenu from "../../../components/nav/AdminMenu";
import Jumbo from "../../../components/cards/Jumbo";
import { useAuth } from "../../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
// import Option from Select;

export default function Product() {
  //context
  const [auth, setAuth] = useAuth();
  //hook
  const navigate = useNavigate();
  //state
  const [routes, setRoutes] = useState([]);
  const [plate, setPlate] = useState("");
  const [photo, setPhoto] = useState(""); //done
  const [no_buses, setNo_buses] = useState("");
  const [price, setPrice] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // useEffect(() => {
  //   loadRoutes();
  // });

  // const loadRoutes = async () => {
  //   try {
  //     const { data } = await axios.get("/routes");
  //     // console.log(data);
  //     setRoutes(data);
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // };

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


  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      // const { name, description, price, category, quantity, shipping }
      const vehicleData = new FormData();
      vehicleData.append("plate", plate);
      vehicleData.append("price", price);    
      vehicleData.append("from", from);
      vehicleData.append("to", to);
      vehicleData.append("no_buses", no_buses);
      vehicleData.append("photo", photo);

      console.log("this is what is being uploaded to the database",vehicleData);
      // change endpoint
      const { data } = await axios.post(`${REACT_APP_API}/vehicle`, vehicleData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.plate} is updated`);
        navigate("/dashboard/admin/vehicle");
      }
      //
    } catch (error) {
      console.log(error);
      toast.error("Could not create vehicle, try again");
    }
  };

  return (
    <>
      <Jumbo
        title={`Welcome ${auth?.user?.name}`}
        subTitle={"Admin Dashboard"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          {/* product image display preveiw */}
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-4 h5 bg-light">Add Bus</div>
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product phot"
                  className="img img-responsive text-center"
                  height="200px"
                />
              </div>
            )}

            {/* upload image to the photo state */}
            <div className>
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload image"}
                <input
                  hidden
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>

            {/* input plate */}
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="form-control mb-3 p-2"
              placeholder="Enter Number Plate"
            />

            {/* input price */}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control mb-3 p-2"
              placeholder="Enter Price"
            />

            {/* used andt select to display the categories */}
            <Select
              // select from
              bordered={false}
              size="large"
              placeholder="Select From"
              className="form-select mb-3 "
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
              className="form-select mb-3 "
              onChange={(value) => setTo(value)}
            >
              {routes?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          
          
            <input
              min="1"
              type="number"
              value={no_buses}
              onChange={(e) => setNo_buses(e.target.value)}
              className="form-control mb-3 p-2"
              placeholder="Enter Number Of Seats"
            />
            <button onClick={handleSubmit} className="btn btn-primary mb-5">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
