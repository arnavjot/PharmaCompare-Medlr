import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [pharmacies, setPharmacies] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const medicineId = searchParams.get('medicineId');

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/pharmacies?medicineId=${medicineId}&page=${currentPage}&limit=5&sort=price&order=${sortOrder}`
        );
        const data = await response.json();
        if (response.ok) {
          setPharmacies(data.pharmacies || []);
          setCurrentPage(data.currentPage || 1);
          setTotalPages(data.totalPages || 1);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch pharmacies.');
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchMedicineDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/medicines/${medicineId}`);
        const data = await response.json();
        if (response.ok) {
          setMedicineName(data.name || 'Unknown Medicine');
        } else {
          console.error('Failed to fetch medicine details.');
        }
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };
    if (medicineId) {
      fetchPharmacies();
      fetchMedicineDetails();
    }
  }, [medicineId, currentPage, sortOrder]);
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1); // Reset to first page
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
      <div className="d-flex justify-content-between align-items-center my-3">
        <h3>Pharmacies offering {medicineName}</h3>
        <button className={`btn ${sortOrder === 'asc' ? 'btn-primary' : 'btn-secondary'}`} onClick={toggleSortOrder}> Sort by Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'} </button>
      </div>
       {pharmacies.length === 0 ? (
        <p className="text-center">No pharmacies found for the selected medicine.</p>
      ) : (
        <ul className="list-group">
          {pharmacies.map((pharmacy) => (
            <li key={pharmacy.name} className="list-group-item">
              <h5>{pharmacy.name}</h5>
              <p> Price: <strong>{pharmacy.price}</strong> </p>
              <p>Address: {pharmacy.address}</p>
              <a href={pharmacy.purchaseLink || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-2"> Buy Now </a>
            </li>
          ))}
        </ul>
      )}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} > Previous </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} > Next </button>
      </div>
    </div>
  );
};
export default SearchResultsPage;
