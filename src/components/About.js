import React from 'react';

const About = () => {
  return (
    <section className='about-section'>
      <div className='about-wrapper'>
        <div className='about-container-left'>
          <h1>Welcome!</h1>
          <p>
            Navigate to the Countries tab or select a country to see how green the countries are!
            Data points include forested area, carbon dioxide emissions, threatened species,
            tourists and much more!
          </p>
        </div>
        <div className='about-container-right'>
          <h1>Created By</h1>
          <p>
            Copyright &copy; 2022 &nbsp;<span>Emily Daykin</span>
          </p>
          <p>
            <img src='../assets/github-logo.png' alt='github logo' />
            &nbsp;
            <a href='https://github.com/emilydaykin'>GitHub</a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/emily-daykin/'>LinkedIn</a>
          </p>
          <p>
            <a href='#'>Portfolio</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
