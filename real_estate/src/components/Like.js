import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { authContext } from "../hooks/authContext";
import { API_URL } from "./env";

const Like = () => {
  const { user } = useContext(authContext);
  const usertoken = user.token;
  const [likeData, setLikeData] = useState([]);

  const fetchLikeData = async () => {
    try {
      const response = await axios.get(`${API_URL}/likes/${user.id}`, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setLikeData(response.data);
      } else {
        console.log("Request failed with status code:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status Code:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      }
    }
  };

  const handleRemoveLike = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete_like/${id}`, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        // Remove the like from the state
        setLikeData(likeData.filter((like) => like._id !== id));
        console.log("Like removed successfully");
      } else {
        console.log("Request failed with status code:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status Code:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      }
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, [user.id, usertoken]);

  return (
    <div>
      <h2>User Likes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Area</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {likeData.map((like) => (
            <tr key={like._id}>
              <td>{like.landDetails.place}</td>
              <td>{like.landDetails.area}</td>
              <td>{like.landDetails.numberOfBedrooms}</td>
              <td>{like.landDetails.numberOfBathrooms}</td>
              <td>${like.landDetails.price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveLike(like._id)}
                >
                  Remove Like
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Like;
