import { API_URL } from "./env";
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginComponent.css';
import rectangle from '../images/rectangle.png';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
var query = require('india-pincode-search');


// const data=query.search('638103');

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();


  const handlePhoneNumberChange = (value) => {
   
    setPhonenumber(value);
  };

  console.log(query.search(pincode));
  const data = query.search(pincode);
  console.log(data)

  if (data.length !== 0) {
    city = data[0].city;
    state = data[0].state;
    country="INDIA";
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
      const response = await axios.post(
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
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data;
      console.log(result);
      setFirstName('');
      setLastName('')
   
      setEmail('');
      setTemp_password('');
      
      setPassword('');

      setPhonenumber('');
      setErrorMessage('');
      setCity('');
      setState('');
      setCountry('');
      setPincode('');

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

    <div class="container-fluid primary-color">
      <section class="row">

        <div class=" col-md-6 d-flex justify-content-center">
          <div class="shadow px-4 rounded-3 w-75">
            <div class='text-left'>
              <h4 class="mb-3">Register Now</h4>


              <input
                type="text"
                class="form-control mb-4"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required />
   <input
                type="text"
                class="form-control mb-4"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required />


              <input
                type="email"
                class="form-control mb-4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />


              <div className=" position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control mb-3 "
                  placeholder="Password"
                  value={temp_password}
                  onChange={(e) => setTemp_password(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon position-absolute top-50 end-0 translate-middle-y px-2 pt-1"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <ion-icon name="eye-outline"></ion-icon>
                  ) : (
                    <ion-icon name="eye-off-outline"></ion-icon>
                  )}
                </span>
              </div>

              <div className=" position-relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control mb-3 "
                  placeholder="Confirm Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon position-absolute top-50 end-0 translate-middle-y px-2 pt-1"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <ion-icon name="eye-outline"></ion-icon>
                  ) : (
                    <ion-icon name="eye-off-outline"></ion-icon>
                  )}
                </span>
              </div>


             



             

              <div className='row'>
              <div class=" col-6">
                <input
                  type="text"
                  class="form-control mb-4"
                  placeholder="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}

                  required />
                  </div>

                <div class=" col-6">
                  <input
                    type="text"
                    class="form-control mb-4"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}

                    required />
                </div>

              </div>
              <div className='row'>


                <div class="col-6">
                  <input
                    type="text"
                    class="form-control mb-4"
                    placeholder="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}

                    required />
                </div>
                <div class="col-6">
                <input
                    type="text"
                    class="form-control mb-4"
                    placeholder="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}

                    required />
                </div>
              </div>




              <div class="rounded">
                <PhoneInput style={{ borderColor: '#6F4DF5' }}
                  className="input-group mb-3 phone"
                  inputStyle={{ borderRadius: '5px', borderColor: '#6F4DF5' }}
                  buttonStyle={{ borderRadius: '5px', backgroundColor: 'white', borderColor: '#6F4DF5' }}
                  country="in"
                  value={phoneNumber}
                 
                  //onChange={(e) => setPhonenumber(e.target.value)}
                  onChange={handlePhoneNumberChange} 
                 
                  // onChange={(phone) => setUserData({ ...userData, phone })}
                  placeholder="Phone Number.." // Add placeholder here
                />
              </div>

              {errorMessage && <div className='mb-3' style={{ color: 'red' }}>{errorMessage}</div>}
              <form onSubmit={collectData}>
                <button style={{"background-color":"#6F4DF5"}} class='button rounded-2 w-100 text-white p-1' type='submit'>SIGN UP</button></form>

              Already have an account? <a href="/" class='link'><Link to="/login">Sign In</Link></a>

            </div>

          </div>
        </div>

        <div class="col-md-6 d-flex justify-content-end">
          <div >
            <img style={{ height: "100%", width: "100%" }} src={rectangle} alt="altimage" class="vh-100 img-responsive" />
          </div>
        </div>

      </section>

    </div>
  );
};

