import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallary.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/auth/user/Dashboard.jsx";
import AdminDashboard from "./pages/auth/admin/Dashboard.jsx";
import UserProfile from "./pages/auth/user/Profile.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import TravelRoute from "./pages/auth/admin/TravelRoute.jsx";
import Vehicle from "./pages/auth/admin/vehicle.jsx";
import Booking from "./pages/booking.jsx";
import History from "./pages/auth/user/history.jsx";
import Enquiry from "./pages/auth/user/enquiry.jsx";
import Booked from "./pages/auth/admin/booked.jsx";
import Message from "./pages/auth/admin/message.jsx";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not Found
    </div>
  );
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/history" element={<History />} />
            <Route path="user/enquiry" element={<Enquiry />} />
          </Route>

          <Route path="/Dashboard" element={<AdminRoute />}>
            {" "}
            {/*this route is protected by signing in and being administrator*/}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/travelRoute" element={<TravelRoute />} />
            <Route path="admin/Vehicle" element={<Vehicle />} />
            <Route path="admin/Booked" element={<Booked />} />
            <Route path="admin/Message" element={<Message />} />
          </Route>
          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
      </BrowserRouter>
    </>
  );
}
