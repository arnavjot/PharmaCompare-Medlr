import React from 'react';
import { Link } from 'react-router-dom';

const MedicineCard = ({ medicine, onRemoveFromFavorites }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body text-center">
        <h5 className="card-title fw-bold text-dark">{medicine.name}</h5>
        <p className="card-text text-muted">{medicine.description}</p>
        <div className="d-flex justify-content-center gap-2">
          <Link to={`/medicine/${medicine._id}`} className="btn btn-primary btn-sm"> View Details </Link>
          {onRemoveFromFavorites && (
            <button onClick={() => onRemoveFromFavorites(medicine._id)} className="btn btn-danger btn-sm"> Remove from Favorites </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
