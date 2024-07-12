import React, { useContext } from 'react';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { authContext } from './hooks/authContext';
import Login from './components/LoginComponent';
import RegistrationComponent from './components/RegistrationComponent';
import TopNavBarComponent from './components/TopNavBar';
import Home from './components/Home';
import LandDetails from './components/LandDetails';
import Myland from './components/Myland';
import LandUpdate from './components/LandUpdate';
import Like from './components/Like';
import Interest from './components/Interest';
import Profile from './components/Profile.js';
import ContactUs from './components/Contact.js';
import { FilterProvider } from './components/FilterContext'; // Import FilterProvider

function App() {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <FilterProvider> {/* Wrap with FilterProvider */}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard/home" />} />
        <Route path="/signup" element={!user ? <RegistrationComponent /> : <Navigate to="/dashboard/home" />} />

        {user && (
          <Route path="/dashboard/*" element={<TopNavBarComponent onLogout={logoutHandler} />}> {/* Pass the onFilterClick function */}
            <Route path="home" element={<Home />} />
            <Route path="landdetails" element={<LandDetails />} />
            <Route path="myland" element={<Myland />} />
            <Route path="like" element={<Like />} />
            <Route path="landupdate/:id" element={<LandUpdate />} />
            <Route path="interest" element={<Interest />} />
            <Route path="userdetails/:id" element={<Profile />} />
            <Route path="contactdetails/:id" element={<ContactUs />} />
          </Route>
        )}
      </Routes>
    </FilterProvider>
  );
}

export default App;
