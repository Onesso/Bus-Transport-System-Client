import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const navigate = useNavigate();

  // console.log(categories);

  const logout = () => {
    setAuth({ ...auth, token: "", user: null });
    localStorage.removeItem("auth");
    navigate("/Login");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-center shadow-sm mb-2 sticky-top bg-light">
        {" "}
        {/*have a fixed nav bar and prevent the jumbo from overflowing into the nav bar */}
        <li className="nav-item mt-2">
          <NavLink className="nav-link " aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink className="nav-link " aria-current="page" to="/About">
            About Us
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink className="nav-link " aria-current="page" to="/Contact">
            Contact Us
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink className="nav-link " aria-current="page" to="/Gallery">
            Gallery
          </NavLink>
        </li>
        {/* used ternanry operatot to display the login and register if the there is not any authenticated user */}
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="m-2 nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/Dashboard/${
                      auth?.user?.user === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
}
