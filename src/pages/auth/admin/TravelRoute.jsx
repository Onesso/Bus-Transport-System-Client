import axios from "axios";
import Jumbo from "../../../components/cards/Jumbo";
import AdminMenu from "../../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Modal } from "antd";

export default function TravelRoute() {
  // state
  const [routeName, setRouteName] = useState("");
  const [allRoute, setAllRoute] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  useEffect(() => {
    loadRoutes();
  }, []);

  // accesssing all the routes from the db
  const loadRoutes = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API}/travelroutes`);
      console.log(data);
      setAllRoute(data);
    } catch (error) {
      console.log(error);
    }
  };

  //creating a route
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior
    try {
      const { data } = await axios.post(`${REACT_APP_API}/travel`, {
        routeName,
      });
      loadRoutes();

      if (data?.error) {
        toast.error(data.error);
      } else {
        console.log("New route is posted =>", data);
        toast.success("New Route Created");
      }
    } catch (error) {
      console.log(error);
      toast.error("Route not created, Try again");
    }
  };

  //update route function
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("this is the route name for update:", updatingName);
    console.log("This is the updating ID", selected._id);
    try {
      const { data } = await axios.put(
        `${REACT_APP_API}/travel/${selected._id}`,
        {
          name: updatingName,
        }
      );
      console.log("data in the client", data);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setSelected(null);
        setUpdatingName("");
        setVisible(false);
        loadRoutes();
        toast.success(`'${data.name}' is updated`);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //function delete route
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${REACT_APP_API}/travel/${selected._id}`
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setSelected(null);
        setUpdatingName("");
        setVisible(false);
        loadRoutes();
        toast.success(`'${data.name}' is Deleted`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Jumbo title={"Destinations And Routes"} />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="row">
              <div className="p-3 mt-2 mb-2 h5 bg-light">Admin information</div>

              <div className="form-group">
                <input
                  type="text"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  className="form-control mb-3 p-2"
                  placeholder="Nairobi"
                />

                <button className="btn btn-primary mb-3" onClick={handleSubmit}>
                  Submit
                </button>
              </div>

              <hr />

              <div className="col d-flex justify-content flex-wrap">
                {/* Map all routes and render their names */}
                {allRoute.map((r) => (
                  <div key={r._id}>
                    <button
                      className="btn btn-outline-success p-2 m-2"
                      onClick={() => {
                        setVisible(true);
                        setSelected(r);
                        setUpdatingName(r.name);
                      }}
                    >
                      {r.name}
                    </button>
                  </div>
                ))}
              </div>

              {/* impliment the modal */}
              <Modal
                title={"Modify Route"}
                open={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <input
                  type="text"
                  className="form-control mb-3 p-2"
                  value={updatingName}
                  onChange={(e) => setUpdatingName(e.target.value)}
                />

                <div className="col d-flex justify-content-between">
                  <button
                    className="btn btn-outline-success"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
