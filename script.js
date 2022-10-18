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

/*
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


// getCountry('portugal');


const renderError = function(message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
}


const getJSON = function(url, errorMsg) {
  return fetch(url)
    .then(response => {
      if(!response.ok) throw new Error(errorMsg);
      return response.json(); 
    })
}

console.log(getJSON(`${baseAPI}/portugal`));

const getCountryData = function(country) {
  getJSON(
    `${baseAPI}/${country}`, 
    'Country not found!'
    )
    .then(data => {
      const country = data[0];
      renderCountry(country);

      const neigbour = country.borders[0];


      if(!country.borders) throw new Error('No neighbour country found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neigbour}`, 
        'Country not found!'
      );
    })
    .then(data => {
      const neigbourCountry = data[0];

      renderCountry(neigbourCountry, 'neighbour')
    })
    .catch(error => {
      renderError(`Something went wrong: ${error.message}`);
    })
}

btn.addEventListener('click', () => getCountryData('canada'));
getCountryData('australia');


# CODING CHALLENGE
*/

// 330610516493881468693x29960

const getCountryData = function(country) {
  fetch(`${baseAPI}/${country}`)
    .then(res => {
      if(!res.ok) throw new Error('Country not found!');

      return res.json();
    })
    .then(data => {
      const country = data[0];

      renderCountry(country);
    })
    .catch(err => console.log(err.message));
}

const whereAmI = function(latitude, longitude) {
  fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=330610516493881468693x29960`)
    .then(res => {
      if(!res.ok) throw new Error('Country not found!');
      return res.json()
    })
    .then(data => {
      console.log(`Você está em ${data.city}, ${data.country}.`);
      console.log(data)
      getCountryData(data.country);
    })
    .catch(err => console.log(err.message));
}

whereAmI(19.037, 72.873);
/*
navigator.geolocation.getCurrentPosition(posiction => {
  const latitude = posiction.coords.latitude;
  const longitude = posiction.coords.longitude;


});
*/





