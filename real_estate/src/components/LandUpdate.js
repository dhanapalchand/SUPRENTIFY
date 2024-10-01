import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { authContext } from '../hooks/authContext'; // Adjust the path as necessary
import { API_URL } from './env'; // Adjust the path as necessary

const LandUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const usertoken = user.token;

  const [landDetails, setLandDetails] = useState({
    place: '',
    area: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    nearbyHospitals: false,
    nearbyColleges: false,
    price: '',
  });

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_one_land/${id}`, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          setLandDetails(response.data);
        } else {
          console.log('Request failed with status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching land details:', error.message);
      }
    };

    fetchLandDetails();
  }, [id, usertoken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLandDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/edit_land/${id}`, landDetails, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        navigate('/dashboard/myland'); // Navigate to the My Land component after successful update
      } else {
        console.log('Update failed with status code:', response.status);
      }
    } catch (error) {
      console.error('Error updating land details:', error.message);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }} >Update Home Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={landDetails.place}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            id="area"
            name="area"
            value={landDetails.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfBedrooms">Number of Bedrooms:</label>
          <input
            type="number"
            id="numberOfBedrooms"
            name="numberOfBedrooms"
            value={landDetails.numberOfBedrooms}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfBathrooms">Number of Bathrooms:</label>
          <input
            type="number"
            id="numberOfBathrooms"
            name="numberOfBathrooms"
            value={landDetails.numberOfBathrooms}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nearbyHospitals">Hospitals Nearby:</label>
          <input
            type="checkbox"
            id="nearbyHospitals"
            name="nearbyHospitals"
            checked={landDetails.nearbyHospitals}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nearbyColleges">Colleges Nearby:</label>
          <input
            type="checkbox"
            id="nearbyColleges"
            name="nearbyColleges"
            checked={landDetails.nearbyColleges}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={landDetails.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default LandUpdate;
