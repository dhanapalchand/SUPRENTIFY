import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from './env';
import { authContext } from "../hooks/authContext";

const Profile = () => {
    const { user } = useContext(authContext);
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const usertoken = user.token;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/get_one_user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    setUserData(response.data);
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

        fetchUserData();
    }, [id, usertoken]);

    const handleBackButtonClick = () => {
        navigate('/'); // Navigate back to the home component
    };

    const handleMailButtonClick = () => {
        navigate(`/dashboard/contactdetails/${id}`); // Navigate to the contact component with the user ID
    };

    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">User Details</h5>
                        <p className="card-text">First Name: {userData.firstName}</p>
                        <p className="card-text">Last Name: {userData.lastName}</p>
                        <p className="card-text">Email: {userData.email}</p>
                        <p className="card-text">Phone: {userData.phoneNumber}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button className="btn btn-primary" onClick={handleBackButtonClick}>Back</button>
            <button className="btn btn-primary" onClick={handleMailButtonClick}>Mail To Interest</button>
        </div>
    );
};

export default Profile;
