import React, { useState, useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { SidebarData } from './Navbardata';
import realestate_log from '../images/realestate_logo.png';
import '../css/Navbar.css';
import { FilterContext } from './FilterContext';
import { authContext } from '../hooks/authContext';



const TopNavBarComponent = ({ onLogout } ) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { toggleFilterBar } = useContext(FilterContext);
  const { user } = useContext(authContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  console.log(user.user.firstName);

  return (
    <>
      <header style={{ position: "sticky", top: "0", zIndex: "1000" }}>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#98FB98" }}>
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <img src={realestate_log} style={{ width: "20%", height: '40px' }} className="d-block" alt="Ecommerce Logo" />
              <h3 className="mt-0 mx-2" style={{ color: "#2F4F4F" }}>SUPRENTIFY</h3>
            </div>
            <button className="navbar-toggler" type="button" onClick={toggleNav} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? 'show' : ''}`} id="navbarNav">
              <div className="navbar-nav">
                {SidebarData.map((item, index) => {
                  if (item.title === 'MyLands' && user.user.role === 'buyer') {
                    return null; // Don't render the "MyLand" NavLink if user role is "buyer"
                  }
                  return (
                    <NavLink
                      key={index}
                      to={item.path}
                      className="nav-item nav-link"
                      style={{ fontSize: "20px", color: isNavOpen ? 'blue' : '#2F4F4F' }}
                      activeClassName="active"
                    >
                      {item.icon}
                      <span className="navbar-item-title">{item.title}</span>
                    </NavLink>
                  );
                })}
              </div>
              <NavLink 
                className="nav-item nav-link" 
                style={{ fontSize: "20px", color: isNavOpen ? 'blue' : '#2F4F4F' }}
                onClick={toggleFilterBar}
              >
                Filter&nbsp;&nbsp;
              </NavLink>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" ><path fill="currentColor" d="M11 10v2H9v2H7v-2H5.8c-.4 1.2-1.5 2-2.8 2c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.3 0 2.4.8 2.8 2zm-8 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m13 4c2.7 0 8 1.3 8 4v2H8v-2c0-2.7 5.3-4 8-4m0-2c-2.2 0-4-1.8-4-4s1.8-4 4-4s4 1.8 4 4s-1.8 4-4 4"></path></svg>

          <span className="navbar-item-title mx-2"  style={{ fontSize: "20px", color: isNavOpen ? 'blue' : '#2F4F4F' }}>{user.user.firstName}</span>
              <div className="ml-5">
                <button className="btn mr-2" style={{ backgroundColor: "#2F4F4F", color: "white" }} onClick={onLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default TopNavBarComponent;
