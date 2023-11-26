import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiry, setEnquiry] = useState("");

  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${REACT_APP_API}/enquiry`, {
        name,
        email,
        phone,
        enquiry,
      });

      console.log("Enquiry from the serve:", data);
      if (data?.error) {
        console.log(data?.error);
        toast.error("Failed to send message");
      } else {
        console.log("enquiry responce from server:", data);
        window.location.reload();
        toast.success("Message sent successfully");
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="backg ">
      <div className="wraper">
        <form className="formStyle">
          <span className="title">SEND US A MESSAGE</span>
          <div>
            <input
              className="input100 border border-white"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input100 border border-white"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input100 border border-white"
              type="text"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <textarea
              className="input100 textarea border border-white"
              placeholder="Your Message"
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
            ></textarea>
          </div>

          <button
            className="btn-style d-f justify-content-center"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
