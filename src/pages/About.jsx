import Jumbo from "../components/cards/Jumbo.jsx";

export default function About() {
  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint
  return (
    <>
      <div>
        <Jumbo />
      </div>
      <div className="container mt-5 mb-5">
        <div className="row card-body shadow-lg p-3 mb-5 bg-white rounded  height">
          <div className="col-md-7">
          <h3 style={{color: "#ED0723"}}>Welcome to Riadha Transport Solutions</h3>

            <h5>
              Our vision at Riadha is to provide exceptional transportation
              services through innovative approaches, leveraging cutting-edge
              technology to consistently delight, retain, and defend our valued
              clients.
            </h5>
            <h6>
              Riadha, operated by Riadha Investments Limited, has been a driving
              force in the transportation industry since 2012, having undergone
              a successful rebranding from 2010 to 2020. With extensive
              experience in the PSV sector and courier services, Riadha, in
              collaboration with Courier Solutions Group (CSG), has meticulously
              addressed industry challenges to deliver outstanding services.
              Covering over 25 routes across Kenya, Riadha is committed to
              expanding its network to encompass additional routes within Kenya
              and throughout the broader East African region. Discover the
              Riadha difference – your trusted partner for safe, reliable, and
              efficient transport solutions.
            </h6>
          </div>
          <div className="col-md-5">
            <img
              className="card-img-top"
              src={`${REACT_APP_API}/vehicle/photo/655900b203e190b4b67dbc59`}
              style={{
                height: "300px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
