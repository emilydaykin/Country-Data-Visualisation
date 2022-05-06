# Green Country Data
A website visualising green data for 192 countries using a countries API. Users can:
* Select from 192 different countries to get each of their 'fast facts' (capital, currency, GDP per capita, internet users etc) and how green they are (CO<sub>2</sub> emissions, forested area, threatened species, tourists etc). 
* View point-in-time comparative data of all countries via bubble charts (threatened species, .......), bar charts....

(Please note the [Data Disclaimer](#data-disclaimer).)

## Site Walkthrough
- Screenshots

## Tech Stack Used:
- Front End: React.js
- SPA Routing and (Functional) Components
- Packages: `axios` for API handling; `chart.js` for data visualisation
- Styling: Sass
- Version Control: Git
- Deployment: Netlify

## Installation:
- LINK Live deployed version
- Clone repo --> `npm install` --> `npm start`

## Code Snippets:
- promises all

## Approach:


## Hurdles:
- Since each data point (country) is a separate API call, an initial hurdle was getting all the data (from ~20 api calls) in the state before manipulating any data.

## Future Improvements:


## Data Disclaimer
The goal of this project was to practise API handling and using chart.js to visualise data with no data pre-processing (cleaning, wrangling or analysis). Data quality is thus poor since the source is unknown and unverified. Data points are provided by an [API](https://api-ninjas.com/api/country).
