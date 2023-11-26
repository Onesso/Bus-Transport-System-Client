
export default function VehicleCard({ p }) {


  const REACT_APP_API = "http://localhost:8000/api"; //this is the server endpoint
  return (
    <div className="card mb-3 m-2 hoverable">
      {/*hoverable is a self-declared css class for creating hover effect */}
      <img
        className="card-img-top"
        src={`${REACT_APP_API}/vehicle/photo/${p._id}`}
        alt={p._id}
        style={{
          height: "300px",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}


