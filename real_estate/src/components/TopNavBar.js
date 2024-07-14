import React, { useState, useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { SidebarData } from './Navbardata';
import realestate_log from '../images/realestate_logo.png';
import '../css/Navbar.css';
import { FilterContext } from './FilterContext';
import { authContext } from '../hooks/authContext';

const TopNavBarComponent = ({ onLogout }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { toggleFilterBar } = useContext(FilterContext);
  const { user } = useContext(authContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  console.log(user.user.role);

  return (
    <>
      <header style={{ position: "sticky", top: "0", zIndex: "1000" }}>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#98FB98" }}>
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <img src={realestate_log} style={{ width: "20%", height: '40px' }} className="d-block" alt="Ecommerce Logo" />
              <h3 className="mt-0 mx-2" style={{ color: "#2F4F4F" }}>SUBRENTIFY</h3>
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
