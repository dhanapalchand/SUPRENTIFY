import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from './env';
import { authContext } from "../hooks/authContext";

const InterestedLandList = () => {
    const { user } = useContext(authContext);
    const [interestedLandList, setInterestedLandList] = useState([]);
    const usertoken = user.token;
   
    useEffect(() => {
        const fetchInterestedLandList = async () => {
            try {
                const response = await axios.get(`${API_URL}/interest/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    setInterestedLandList(response.data);
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

        fetchInterestedLandList();
    }, [user.id, usertoken]);

    const handleRemoveInterest = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete_interest/${id}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                setInterestedLandList(interestedLandList.filter((land) => land._id !== id));
                console.log('Interest removed successfully');
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

    return (
        <div>
            <h2>Interested Land List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Land ID</th>
                        <th>Place</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {interestedLandList.map((land) => (
                        <tr key={land._id}>
                           <td>{land.landDetails.place}</td>
              <td>{land.landDetails.area}</td>
              <td>{land.landDetails.numberOfBedrooms}</td>
              <td>{land.landDetails.numberOfBathrooms}</td>
              <td>${land.landDetails.price}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveInterest(land._id)}
                                >
                                    Remove Interest
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InterestedLandList;
