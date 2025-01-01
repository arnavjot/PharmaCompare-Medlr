import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MedicineCard from '../components/MedicineCard';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';
const ProfilePage = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavorites = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5000/api/users/favorites', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setFavorites(data || []);
          } else {
            setError(data.message || 'Failed to fetch favorites.');
          }
        } catch (error) {
          setError('An error occurred while fetching favorites.');
        } finally {
          setLoading(false);
        }
      };
      fetchFavorites();
    } else {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
    navigate('/');
  };

  const handleRemoveFavorite = async (medicineId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/favorites/${medicineId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((medicine) => medicine._id !== medicineId)
        );
        alert('Medicine removed from favorites.');
      } else {
        alert(data.message || 'Failed to remove favorite.');
      }
    } catch (error) {
      alert('An error occurred while removing favorite.');
    }
  };
  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;
  return (
    <div className="container mt-4 mb-5"> 
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Your Profile</h1>
        <button onClick={handleLogout} className="btn btn-danger"> Logout </button>
      </div>
      <h3 className="text-muted mb-4">Your Favorites</h3>
      {favorites.length > 0 ? (
        <div className="row g-4">
          {favorites.map((medicine) => (
            <div key={medicine._id} className="col-sm-6 col-md-4">
              <MedicineCard medicine={medicine} onRemoveFromFavorites={handleRemoveFavorite} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert"> You have no favorite medicines. </div>
      )}
    </div>
  );
};
export default ProfilePage;
