import React from 'react';
import { Home, Car, PenTool as Tool, Phone, User, Info, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';



const Navbar = () => {


  

  return (
    <div>
      <br />
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="logo">
            <Car className="logo-icon" />
            <span className="logo-text">Car Connect</span>
          </div>
          
          <div className="nav-links">
            <NavLink to="/user/dash" icon={<Home />} text="Home" />
            <NavLink to='/about/us' icon={<Info />} text="About US" />
            <NavLink to='/contact/us' icon={<Phone />} text="Contact Us" />
            <NavLink to='' icon={<User />} text="Account" />
            <NavLink to='/mech/dash ' icon={<Sun />} text="mc" />
            

          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

const NavLink = ({ icon, text,to }) => (
  <Link to={to} className="nav-link">
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;