import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { countriesToDisplay } from '../lib/countryList';

const Navbar = () => {
  const navigate = useNavigate();

  function handleChange(e) {
    console.log('changed!');
    console.log(e.target.value);
    navigate(`/countries/${e.target.value}`);
  }
  return (
    <header>
      <nav className='navbar'>
        <div className='navbar-left'>
          <Link className='navbar-item' to='/'>
            Home
          </Link>
          <Link className='navbar-item' to='/about'>
            About
          </Link>
          <Link className='navbar-item' to='/countries'>
            Countries
          </Link>
        </div>
        <div className='navbar-right'>
          {/* <Link className='navbar-item' to='/countries'>
            Select Country
          </Link> */}
          {/* <ReactDropdown options={countriesToDisplay} placeholder='Select Country...' /> */}
          <div>
            <label>
              <select className='dropdown' value='Select Country' onChange={handleChange}>
                <option selected disabled hidden>
                  Select Country
                </option>
                {countriesToDisplay.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            {/* <label>
              <select>
                <option value='' selected disabled hidden>
                  Choose here
                </option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
                <option value='4'>Four</option>
                <option value='5'>Five</option>
              </select>
            </label> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
