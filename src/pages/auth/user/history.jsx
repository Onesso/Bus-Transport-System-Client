import React from "react";
import Jumbo from "../../../components/cards/Jumbo.jsx";
import { useAuth } from "../../../context/auth";
import UserMenu from "../../../components/nav/UserMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export default function History() {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [travelHistory, setTravelHistory] = useState([]);

  useEffect(() => {
    loadTravelHistory();
  }, []);

  const loadTravelHistory = async () => {
    try {
      const { data } = await axios.get("/book");
      if (data?.error) {
        console.log(data?.error);
      } else {
        console.log(data);
        setTravelHistory(data);
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
          subTitle={"User Dashboard"}
        />
      </div>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="p-3 mt-2 mb-2 h5 bg-light"> Orders</div>
          {travelHistory?.map((h, index) => {
            return (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">price</th>
                    <th scope="col">phone</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Seat Number</th>
                    <th scope="col">Booked</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{h?.name}</td>
                    <td>{h?.price}</td>
                    <td>{h?.phone}</td>
                    <td>{h?.jina1}</td>
                    <td>{h?.jina2}</td>
                    <td>{h?.seat}</td>
                    <td>{moment(h?.createdAt).fromNow()}</td>
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
