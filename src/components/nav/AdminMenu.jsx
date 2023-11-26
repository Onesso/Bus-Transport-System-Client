import { NavLink } from "react-router-dom";
export default function AdminMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h5 bg-light">Admin Links</div>
      <ul className="list-group list-unstyled">
        <li>
          <NavLink
            className="list-group-item mt-2 mb-2"
            to={"/dashboard/admin/TravelRoute"}
          >
            Create Route
          </NavLink>
        </li>

        <li>
          <NavLink
            className="list-group-item mt-2 mb-2"
            to={"/dashboard/admin/vehicle"}
          >
            Create Vehicle
          </NavLink>
        </li>

        <li>
          <NavLink
            className="list-group-item mt-2 mb-2"
            to={"/dashboard/admin/booked"}
          >
            Booked Trips
          </NavLink>
        </li>

        <li>
          <NavLink
            className="list-group-item mt-2 mb-2"
            to={"/dashboard/admin/message"}
          >
            Enquiry Messages
          </NavLink>
        </li>
      </ul>
    </>
  );
}
