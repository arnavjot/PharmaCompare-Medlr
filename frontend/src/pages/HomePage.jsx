import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import Loader from '../components/Loader';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [popularMedicines, setPopularMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const searchButtonRef = useRef(null);

  useEffect(() => {
    const fetchPopularMedicines = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/medicines');
        const data = await response.json();
        if (response.ok) {
          setPopularMedicines(data.medicines || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch popular medicines');
        }
      } catch (error) {
        setError('An error occurred while fetching popular medicines.');
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMedicines();
    
  }, []);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim()) {
      setLoadingSuggestions(true);
      try {
        const response = await fetch(`http://localhost:5000/api/medicines?name=${query}`);
        const data = await response.json();
        if (response.ok) {
          setSuggestions(data.medicines || []);
        } else {
          console.error('Failed to fetch search suggestions.');
        }
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      } finally {
        setLoadingSuggestions(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchButtonClick = async () => {
    if (!search.trim()) {
      alert('Please enter a valid search query.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/medicines?name=${search}`);
      const data = await response.json();

      if (response.ok && data.medicines.length > 0) {
        const medicineId = data.medicines[0]._id;
        navigate(`/search-results?medicineId=${medicineId}`);
      } else {
        alert('No matching medicine found.');
      }
    } catch (error) {
      console.error('Error searching for medicine:', error);
      alert('An error occurred while searching. Please try again.');
    }
  };

  const handleClickOutside = (event) => {
    if ( suggestionsRef.current && !suggestionsRef.current.contains(event.target) && searchButtonRef.current !== event.target ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '48vh' }}>
        <h1 className="text-center mb-4">Welcome to PharmaCompare</h1>
        <div className="d-flex justify-content-center align-items-center w-100 px-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="d-flex w-100" style={{ gap: '10px', flexWrap: 'nowrap' }}>
            <input type="text" placeholder="Search for medicines..." value={search} onChange={handleSearchChange} className="form-control" style={{ flex: '1', minWidth: '0' }}/>
            <button ref={searchButtonRef} onClick={handleSearchButtonClick} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}> Search </button> </div>
        </div>

        {loadingSuggestions && <Loader />}
        {error && <ErrorAlert message={error} />}
        {suggestions.length > 0 && !loadingSuggestions && (
          <ul className="list-group mt-3" ref={suggestionsRef} style={{ maxWidth: '600px', width: '100%',margin: '0 auto', overflowY: 'scroll', border: '1px solid #ddd', borderRadius: '5px' }} >
            {suggestions.map((medicine) => (
              <li key={medicine._id} className="list-group-item" style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }} onClick={() => navigate(`/search-results?medicineId=${medicine._id}`)}> {medicine.name} </li>
            ))}
          </ul>
        )}
      </div>

      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Popular Medicines</h2>
        {loading && <Loader />}
        {error && <ErrorAlert message={error} />}
        {!loading && !error && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {popularMedicines.map((medicine) => (
              <div key={medicine._id} className="medicine-box p-3 text-center bg-light border rounded" data-bs-toggle="tooltip" data-bs-placement="top" title={`click to view more details`} onClick={() => navigate(`/medicine/${medicine._id}`)} style={{ cursor: 'pointer', minWidth: '150px', maxWidth: '200px' }}>
                {medicine.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
