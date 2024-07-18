import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from './env';
import { authContext } from "../hooks/authContext";


const AboutLand = () => {
    const { user } = useContext(authContext);
    const { id } = useParams();
    const [landData, setLandData] = useState([]);
    const usertoken = user.token;
    const navigate = useNavigate();
    console.log("succss");
    useEffect(() => {
        const fetchLandData = async () => {
            try {
                const response = await axios.get(`${API_URL}/get_one_land/${id}`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    setLandData(response.data);
                    console.log(response.data);
                } else {
                    console.log('Request failed with status code:', response.status);
                }
            } catch (error) {
                console.error('Error:', error.message);
                if (error.response) {
                    console.error('Error Response Data:', error.response.data);
                    console.error('Error Status Code:', error.response.status);
                    console.error('Error Headers:', error.response.headers);
                }
            }
        };

        fetchLandData();
    }, [id, usertoken]);

    const handleInterestedClick = async (land) => {
        try {
          const response = await axios.post(`${API_URL}/interest_land`, {
            userId: user.id,
            landId: land._id,
            landDetails: land,
          }, {
            headers: {
              Authorization: `Bearer ${usertoken}`,
            },
          });
          if (response.status >= 200 && response.status < 300) {
            console.log('Interest registered successfully');
            navigate(`/dashboard/userdetails/${land.user}`);
          } else {
            console.log('Request failed with status code:', response.status);
            navigate(`/dashboard/userdetails/${land.user}`);
          }
        } catch (error) {
          console.error('Error:', error.message);
          navigate(`/dashboard/userdetails/${land.user}`);
          if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Status Code:', error.response.status);
            console.error('Error Headers:', error.response.headers);
            navigate(`/dashboard/userdetails/${land.user}`);
          }
        }
      };
      
console.log(landData);
    return(
        <div className="container d-flex justify-content-center" style={{ minHeight: '100vh', alignItems: 'center' }}>
        <div className="row" style={{ width: '100%' }}>
          <div className='col-6 d-flex flex-column align-items-center'>
            <img 
              src={landData.imgUrl}
              style={{ borderRadius: '15px', width: '350px', height: '440px', marginBottom: '10px' }} 
            />
            <button
              type="button"
              className="btn btn-success me-2"
              onClick={() => handleInterestedClick(landData)}
            >
              Interested
            </button>
          </div>
          <div className='col-6'>
            <h3>Location : {landData.place}</h3>
            <h3>City : {landData.area}</h3>
            <p className="card-text">Bedrooms: {landData.numberOfBedrooms}</p>
            <p className="card-text">Bathrooms: {landData.numberOfBathrooms}</p>
            <p className="card-text">Nearby Hospitals: {landData.nearbyHospitals ? 'Yes' : 'No'}</p>
            <p className="card-text">Nearby Colleges: {landData.nearbyColleges ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
);
};
export default AboutLand;