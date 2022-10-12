'use strict';

const baseAPI = 'https://restcountries.com/v3.1/name';
const neighbourBaseAPI = 'https://restcountries.com/v3.1/alpha';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function(country, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${country.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${country.name.common}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${(+country.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${country.languages[Object.keys(country.languages)[0]]}</p>
        <p class="country__row"><span>💰</span>${Object.keys(country.currencies)[0]}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeEnd', html);
  countriesContainer.style.opacity = 1;
}

const getCountry = function(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `${baseAPI}/${country}`);
  request.send();
  
  request.addEventListener('load', function() {
    const country = JSON.parse(this.responseText)[0];
    const borders = country.borders;

    renderCountry(country);
    if(!borders) return;

    borders.forEach(border => {
      getCountryNeighbour(border);
    })
  
  });
};

const getCountryNeighbour = function(neighbourCode) {
  const request = new XMLHttpRequest();
  request.open('GET', `${neighbourBaseAPI}/${neighbourCode}`);
  request.send();
  
  request.addEventListener('load', function() {
    const neigbourCountry = JSON.parse(this.responseText)[0];
    const border = neigbourCountry.borders[0];
  
    renderCountry(neigbourCountry, 'neighbour') 
    //getCountryNeighbour(border);
  
  });
};


getCountry('spain');


const getCountryData = function(country) {
  fetch(`${baseAPI}/${country}`)
    .then(response => response.json())
    .then(data => console.log(data[0]));
}

getCountryData('portugal')

