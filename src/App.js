import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Country from './components/Country';
import AllCountries from './components/AllCountries';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/all-countries' element={<AllCountries />} />
        <Route path='/countries/:id' element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
