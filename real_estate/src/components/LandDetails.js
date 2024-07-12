import React, { useState, useContext } from 'react';
import { authContext } from '../hooks/authContext';
import axios from 'axios';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { storage } from '../firebase';

const LandDetails = () => {
  const [place, setPlace] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState(false);
  const [nearbyColleges, setNearbyColleges] = useState(false);
  const [price, setPrice] = useState('');
  const { user } = useContext(authContext);
  const usertoken = user.token;
  const userId = user.id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [url, setUrl] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const storageRef = ref(storage, `landimage/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        setUploadStatus('Error uploading image');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          setUploadStatus('Image uploaded successfully');
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setUploadStatus('Image not uploaded yet');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/post_land',
        {
          user: userId,
          place,
          area,
          numberOfBedrooms: bedrooms,
          numberOfBathrooms: bathrooms,
          nearbyHospitals,
          nearbyColleges,
          price,
          imgUrl: url, // Include the image URL in the form data
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usertoken}`,
          },
        }
      );
      console.log(response.data); // Assuming the response data contains the saved land details

      // Reset form after successful submission
      setPlace('');
      setArea('');
      setBedrooms('');
      setBathrooms('');
      setNearbyHospitals(false);
      setNearbyColleges(false);
      setPrice('');
      setSelectedFile(null);
      setUploadStatus('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting land details:', error);
      setUploadStatus('Error submitting land details');
    }
  };

  return (
    <div>
      <h2>Enter Land Details for Selling</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bedrooms">Number of Bedrooms:</label>
          <input
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bathrooms">Number of Bathrooms:</label>
          <input
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nearbyHospitals">Hospitals Nearby:</label>
          <input
            type="checkbox"
            id="nearbyHospitals"
            checked={nearbyHospitals}
            onChange={(e) => setNearbyHospitals(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="nearbyColleges">Colleges Nearby:</label>
          <input
            type="checkbox"
            id="nearbyColleges"
            checked={nearbyColleges}
            onChange={(e) => setNearbyColleges(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileInput">Select an image:</label>
          <input
            type="file"
            id="fileInput"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div>
        <button type="button" onClick={handleUpload}>Upload Image</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {uploadStatus && <div className="alert alert-info mt-3">{uploadStatus}</div>}
    </div>
  );
};

export default LandDetails;
