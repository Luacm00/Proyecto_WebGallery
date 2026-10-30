import { Link } from "react-router-dom";

export default function ObraCard({ obra }) {
  return (
    <div className="card h-100">
      <img
        src={obra.imageUrl}
        alt={obra.title}
        className="card-img-top"
        loading="lazy"
        style={{
          height: 300,
          objectFit: "cover",
          backgroundColor: obra.dominantColor ?? "#e9ecef",
        }}
      />
      <div className="card-body">
        <h2 className="card-title h6">
          <Link
            to={`/obras/${obra.id}`}
            className="stretched-link text-decoration-none text-dark"
          >
            {obra.title}
          </Link>
        </h2>
        <p className="card-text text-muted small">{obra.artist.name}</p>
      </div>
    </div>
  );
}
