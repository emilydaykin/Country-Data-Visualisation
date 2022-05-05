import React from 'react';
import githubLogo from '../assets/github-logo.png';
import linkedinLogo from '../assets/linkedin-logo.png';

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

          <a href='https://github.com/emilydaykin'>
            GitHub
            <img src={githubLogo} alt='github logo' />
          </a>

          <a href='https://www.linkedin.com/in/emily-daykin/'>
            LinkedIn
            <img src={linkedinLogo} alt='github logo' />
          </a>

          <p>
            <a href='#'>Portfolio</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
