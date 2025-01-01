import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const MedicineDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [medicine, setMedicine] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const medicineResponse = await fetch(`http://localhost:5000/api/medicines/${id}`);
        const medicineData = await medicineResponse.json();
        if (medicineResponse.ok) {
          setMedicine(medicineData);
        } else {
          setError(medicineData.message || 'Failed to fetch medicine details.');
        }
      } catch (error) {
        setError('An error occurred while fetching medicine details.');
      }
    };

    const fetchPharmacies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/pharmacies?medicineId=${id}&page=${currentPage}&limit=5`
        );
        const data = await response.json();
        if (response.ok) {
          setPharmacies(data.pharmacies || []);
          setTotalPages(data.totalPages || 1);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch pharmacies.');
        }
      } catch (error) {
        setError('An error occurred while fetching pharmacies.');
      } finally {
        setLoading(false);
      }
    };

    const checkFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setIsFavorite(data.some((fav) => fav._id === id));
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    fetchMedicineDetails();
    fetchPharmacies();
    checkFavoriteStatus();
  }, [id, currentPage]);

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ medicineId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFavorite(true);
        alert('Medicine added to favorites.');
      } else {
        alert(data.message || 'Failed to add to favorites.');
      }
    } catch (error) {
      alert('An error occurred while adding to favorites.');
    }
  };
  const handleRemoveFromFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsFavorite(false);
        alert('Medicine removed from favorites.');
      } else {
        alert(data.message || 'Failed to remove from favorites.');
      }
    } catch (error) {
      alert('An error occurred while removing from favorites.');
    }
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;
  return (
    <div className="container mt-4 mb-5"> 
      <h1>{medicine?.name || 'Medicine Details'}</h1>
      <p>{medicine?.description || 'No description available.'}</p>
      {isAuthenticated && (
        <div className="mt-4">
          {!isFavorite ? (
            <button className="btn btn-primary me-2" onClick={handleAddToFavorites}> Add to Favorites </button>
          ) : (
            <button className="btn btn-danger" onClick={handleRemoveFromFavorites}> Remove from Favorites </button>
          )}
        </div>
      )}

      <h2 className="mt-4">Available at Pharmacies</h2>
      {pharmacies.length > 0 ? (
        <ul className="list-group">
          {pharmacies.map((pharmacy, index) => (
            <li key={index} className="list-group-item">
              <strong>{pharmacy.name}</strong>
              <p>Price: {pharmacy.price}</p>
              <p>Address: {pharmacy.address}</p>
              <a href={pharmacy.purchaseLink || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-2">Buy Now</a>
            </li>
          ))}
        </ul>
      ) : ( <p>No pharmacies found for this medicine.</p> )}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} > Previous </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}> Next </button>
      </div>
    </div>
  );
};

export default MedicineDetailsPage;
