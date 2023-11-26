import React from "react";
import Jumbo from "../../../components/cards/Jumbo.jsx";
import { useAuth } from "../../../context/auth";
import AdminMenu from "../../../components/nav/AdminMenu.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export default function Message() {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [enquire, setEnquire] = useState([]);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      const { data } = await axios.get("/enquiry");
      if (data?.error) {
        console.log(data?.error);
      } else {
        console.log(data);
        setEnquire(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Jumbo
          title={`Welcome ${auth?.user?.name}`}
          subTitle={"Admin Dashboard"}
        />
      </div>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="p-3 mt-2 mb-2 h5 bg-light">Enquiry</div>
          {enquire?.map((h, index) => {
            return (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                    <th scope="col">Time Sent</th>
                    <th scope="col">Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{h?.name}</td>
                    <td>{h?.email}</td>
                    <td>{h?.phone}</td>
                    <td>{moment(h?.createdAt).fromNow()}</td>
                    <td>{h?.enquiry}</td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </>
  );
}
