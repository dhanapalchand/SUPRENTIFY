import { API_URL } from "./env";
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginComponent.css';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
var query = require('india-pincode-search');

export default function RegistrationComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [temp_password, setTemp_password] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pincode, setPincode] = useState('');
  var [city, setCity] = useState('');
  var [state, setState] = useState('');
  var [country, setCountry] = useState('');
  const [role, setRole] = useState(''); // New state for role
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [address,setAdress]=useState('');
  const navigate = useNavigate();

  const handlePhoneNumberChange = (value) => {
    setPhonenumber(value);
  };

  const data = query.search(pincode);

  if (data.length !== 0) {
    city = data[0].city;
    state = data[0].state;
    country = "INDIA";
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    if (!firstName.trim()) {
      setErrorMessage('Username is required');
      return false;
    }

    if (!email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    if (!temp_password.trim()) {
      setErrorMessage('Password is required');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(temp_password)) {
      setErrorMessage(
        'Password must have at least 6 characters, one uppercase letter, and one number'
      );
      return false;
    }

    if (!password.trim()) {
      setErrorMessage('Confirmation Password is required');
      return false;
    }

    if (password !== temp_password) {
      setErrorMessage('Password and Confirmation Password do not match');
      return false;
    }

    if (!phoneNumber.trim()) {
      setErrorMessage('Phone number is required');
      return false;
    }

    setErrorMessage('');
    return true;
  };


  const collectData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
       await axios.post(
        `${API_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          pincode,
          city,
          state,
          country,
          role,
          address// Include role in the data to be sent
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setFirstName('');
      setLastName('');
      setEmail('');
      setTemp_password('');
      setPassword('');
      setPhonenumber('');
      setErrorMessage('');
      setCity('');
      setState('');
      setCountry('');
      setPincode('');
      setAdress('');
      setRole('');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setErrorMessage('User already exists with this username or password. Try Again ');
      } else if (error.request) {
        setErrorMessage('No response received from the server');
      } else {
        setErrorMessage('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <section className="row">
        <div className="col-md-7 mt-5 d-flex justify-content-center">
          <div className="shadow px-4 rounded-3 w-75">
            <div className="text-left">
              <h4 className="mb-3">Register Now</h4>
              <form onSubmit={collectData}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control mb-2"
                    placeholder="Password"
                    value={temp_password}
                    onChange={(e) => setTemp_password(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle-icon position-absolute top-50 end-0 translate-middle-y px-2 pt-1"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                  >
                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} />
                  </span>
                </div>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control mb-2"
                    placeholder="Confirm Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle-icon position-absolute top-50 end-0 translate-middle-y px-2 pt-1"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: 'pointer' }}
                  >
                    <IonIcon icon={showConfirmPassword ? eyeOutline : eyeOffOutline} />
                  </span>
                </div>
                <select
                  className="form-control mb-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">select Home(buyer/seller)...</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select> 
                 <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAdress(e.target.value)}
                  required
                />
                <div className="row">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="rounded">
                  <PhoneInput
                    className="input-group mb-2 phone"
                    inputStyle={{ borderRadius: '5px' }}
                    buttonStyle={{ borderRadius: '5px', backgroundColor: 'white' }}
                    country="in"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Phone Number"
                  />
                </div>
                {errorMessage && <div className="mb-3" style={{ color: 'red' }}>{errorMessage}</div>}
                <button style={{ backgroundColor: "#008000" }} className="button rounded-2 w-100 text-white p-1 mb-1" type="submit">SIGN UP</button>
              </form>
              <div className="mb-2 mx-5">
                Already have an account? <a href="/" className="link"><Link to="/login">Sign In</Link></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 d-flex justify-content-center">
          <div>
            <dotlottie-player src="https://lottie.host/ba74bf8a-65aa-4338-80ae-2147b0dd996f/8nO6Zz9baV.json" background="transparent" speed="1" style={{ width: "550px", height: "600px" }} loop autoplay className="img-responsive mt-5"></dotlottie-player>
          </div>
        </div>
      </section>
    </div>
  );
}
