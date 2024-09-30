import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { authContext } from '../hooks/authContext';
import { API_URL } from "./env";
import { useNavigate } from 'react-router-dom';

const UserLandDetails = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
   
    const { user } = useContext(authContext);
    const usertoken = user.token;
    const userId = user.id;

    const getLandData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_land/${userId}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                const fetchedData = response.data;
                console.log(fetchedData);
                setUserData(fetchedData);
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

    const handleUpdate = (id) => {
        // Navigate to LandUpdate page with the particular land id
        navigate(`/dashboard/landupdate/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/delete_land/${id}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
            });
            // After successful deletion, update the state to remove the deleted land
            setUserData(userData.filter(land => land._id !== id));
            console.log('Land deleted successfully');
        } catch (error) {
            console.error('Error deleting land:', error.message);
        }
    };

    useEffect(() => {
        getLandData();
    }, []);

    return (
        <div>
            <h2>My Home Details</h2>
            {userData && userData.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Area</th>
                            <th>Bedrooms</th>
                            <th>Bathrooms</th>
                            <th>Nearby Hospitals</th>
                            <th>Nearby Colleges</th>
                            <th>Rent</th>
                            <th>Insights</th>
                            <th>Update</th>
                            <th>Delete</th>

                            
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((land) => (
                            <tr key={land._id}>
                                <td>{land.place}</td>
                                <td>{land.area}</td>
                                <td>{land.numberOfBedrooms}</td>
                                <td>{land.numberOfBathrooms}</td>
                                <td>{land.nearbyHospitals ? 'Yes' : 'No'}</td>
                                <td>{land.nearbyColleges ? 'Yes' : 'No'}</td>
                                <td>${land.price}</td>
                                <td>
                                <button  className="btn btn-primary me-2" onClick={() => handleDelete(land._id)}>View</button>
</td><td>
                                    <button   className="btn btn-success me-2"onClick={() => handleUpdate(land._id)}>Update</button>
                                    </td><td>
                                    <button  className="btn btn-danger me-2" onClick={() => handleDelete(land._id)}>Delete</button>
                                    </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No land details found.</p>
            )}
        </div>
    );
};

export default UserLandDetails;
