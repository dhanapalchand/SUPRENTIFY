import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { authContext } from '../hooks/authContext';
import { API_URL } from "./env";
import landimg from '../images/land.jpg';
import TopFilterBar from "./TopFilterBar";
import { FilterContext } from './FilterContext';
import { IoHeart } from 'react-icons/io5'; 

const Home = () => {
  const navigate = useNavigate();
  const [landData, setLandData] = useState([]);
  const [filteredLandData, setFilteredLandData] = useState([]);
  const [like, setlike] = useState(0);
  const { user } = useContext(authContext);
  const usertoken = user.token;
  const { showFilterBar } = useContext(FilterContext);
  const [likedLands, setLikedLands] = useState([]);
  const [likeData, setLikeData] = useState([]);

  const buttonStyle = {
    position: 'fixed',
    top: '90%',
    left: '90%',
  };

  const handleAddLandClick = () => {
    navigate('/dashboard/landdetails');
  };

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

  const handleRemoveLike = async (likedLands, land) => {
    try {
      const likedLandEntry = likedLands.find(entry => entry.landId === land._id && entry.userId === user.id);

      if (likedLandEntry) {
        const response = await axios.delete(`${API_URL}/delete_like/${likedLandEntry._id}`, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          console.log("Like removed successfully");
          setlike(like - 1);

          setLandData(prevLandData =>
            prevLandData.map(item =>
              item._id === land._id ? { ...item, liked: false } : item
            )
          );

          setFilteredLandData(prevFilteredLandData =>
            prevFilteredLandData.map(item =>
              item._id === land._id ? { ...item, liked: false } : item
            )
          );

          setLikeData(prevLikeData =>
            prevLikeData.filter(like => like._id !== likedLandEntry._id)
          );

        } else {
          console.log("Request failed with status code:", response.status);
        }
      } else {
        console.log("Liked land entry not found.");
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

  const handleLikeClick = async (land) => {
    if (land.liked) {
      await handleRemoveLike(likedLands, land);
    } else {
      try {
        const response = await axios.post(`${API_URL}/like_land`, {
          userId: user.id,
          landId: land._id,
          landDetails: land,
        }, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          console.log('Land liked successfully');
          setlike(like + 1);
          setLandData(prevLandData => prevLandData.map(item => {
            if (item._id === land._id) {
              return { ...item, liked: true };
            }
            return item;
          }));
          setFilteredLandData(prevFilteredLandData => prevFilteredLandData.map(item => {
            if (item._id === land._id) {
              return { ...item, liked: true };
            }
            return item;
          }));
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
    }
  };

  useEffect(() => {
    const getUserLikedLands = async () => {
      try {
        const response = await axios.get(`${API_URL}/likes/${user.id}`, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          const fetchedLikedLands = response.data;
  
          // Update likedLands state
          setLikedLands(fetchedLikedLands);
  
          // Update landData and filteredLandData based on fetchedLikedLands
          setLandData(prevLandData =>
            prevLandData.map(land => ({
              ...land,
              liked: fetchedLikedLands.some(likedLand => likedLand.landId === land._id)
            }))
          );
  
          setFilteredLandData(prevFilteredLandData =>
            prevFilteredLandData.map(land => ({
              ...land,
              liked: fetchedLikedLands.some(likedLand => likedLand.landId === land._id)
            }))
          );
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
  
    getUserLikedLands();
  }, [user.id, usertoken,like]); // Ensure dependencies are updated when user.id or usertoken changes
  

  useEffect(() => {
    const getLandData = async () => { 
      try {
        const response = await axios.get(`${API_URL}/get_land`, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          const fetchedData = response.data;
          setLandData(fetchedData);
          setFilteredLandData(fetchedData);
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

    getLandData();
  }, [usertoken]);

  useEffect(() => {
    const getAllLiked = async () => {
      try {
        const response = await axios.get(`${API_URL}/likes`, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          const likefetchedData = response.data;
          setLikeData(likefetchedData);
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

    getAllLiked();
  }, [like,usertoken]);

  const toggleShowMore = (landId) => {
    navigate(`/dashboard/aboutland/${landId}`);
  };

  return (
    <div>
      {showFilterBar && <TopFilterBar setLandData={setLandData} landData={landData} setFilteredLandData={setFilteredLandData} />}
      <div className="row mb-3 mx-0">
        {filteredLandData.map((land) => {
          const likesCount = likeData.filter(like => like.landId === land._id).length;
          return (
            <div key={land._id} className="col-md-3 mb-3 mx-0">
              <div className="card mt-3">
                <img
                  src={land.imgUrl || landimg}
                  className="card-img-top"
                  alt={land.place}
                  style={{ width: "100%", height: "140px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{land.place}</h5>
                  <p className="card-text">Area: {land.area}</p>
                  <p className="card-text">Rent: ${land.price} Monthly</p>
                  <p className="card-text">Home Type: {land.numberOfBedrooms} BHK</p>
                  {/* {showMore[land._id] && (
                    <div>
                      <p className="card-text">Bedrooms: {land.numberOfBedrooms}</p>
                      <p className="card-text">Bathrooms: {land.numberOfBathrooms}</p>
                      <p className="card-text">Nearby Hospitals: {land.nearbyHospitals ? 'Yes' : 'No'}</p>
                      <p className="card-text">Nearby Colleges: {land.nearbyColleges ? 'Yes' : 'No'}</p>
                    </div>
                  )} */}
                 
                  {/* <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => handleInterestedClick(land)}
                    >
                      Interested
                    </button>
                     <p className="card-text">
                    <IoHeart style={{ color: land.liked ? 'red' : 'black', marginRight: '5px', cursor: 'pointer' }}
                      onClick={() => handleLikeClick(land)} />
                    {likesCount}
                  </p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => toggleShowMore(land._id)}
                    >
                      More Details
                    </button>
                  </div> */}
                  <div className="d-flex align-items-center">
  <p className="card-text mb-0">
    <IoHeart
      style={{
        color: land.liked ? 'red' : 'black',
        marginRight: '5px',
        cursor: 'pointer'
      }}
      onClick={() => handleLikeClick(land)}
    />
    {likesCount}
  </p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <button
    type="button"
    className="btn btn-secondary ml-3"
    onClick={() => toggleShowMore(land._id)}
  >
    More Details
  </button>
</div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="" style={{ paddingTop: '3%' }}>
  {user.user.role !== 'buyer' && (
    <button
      type="button"
      className="btn btn-primary rounded-1 p-2 px-4 mb-4"
      onClick={handleAddLandClick}
      style={buttonStyle}
    >
      <span>Add Home</span>
    </button>
  )}
</div>
    </div>
  );
};

export default Home;
