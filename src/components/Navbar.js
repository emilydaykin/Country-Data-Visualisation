import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { countriesToDisplay } from '../lib/countryList';

const Navbar = () => {
  const navigate = useNavigate();

  const handleChange = (e) => navigate(`/countries/${e.target.value}`);

  return (
    <header>
      <nav className='navbar'>
        <Link className='navbar-item' to='/'>
          Home
        </Link>
        <Link className='navbar-item' to='/about'>
          About
        </Link>
        <Link className='navbar-item' to='/all-countries'>
          All Countries
        </Link>
        <label>
          <select className='dropdown' value='Select Country' onChange={handleChange}>
            <option defaultValue disabled hidden>
              Select Country
            </option>
            {countriesToDisplay.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
      </nav>
    </header>
  );
};

export default Navbar;
