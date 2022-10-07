'use strict';

const baseAPI = 'https://restcountries.com/v3.1/name';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountry = function(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `${baseAPI}/${country}`);
  request.send();
  
  request.addEventListener('load', () => {
    const country = JSON.parse(request.responseText)[0];
    console.log(country);
  
    const html = `
      <article class="country">
        <img class="country__img" src="${country.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${country.name.common}</h3>
          <h4 class="country__region">REGION</h4>
          <p class="country__row"><span>👫</span>${(+country.population / 1000000).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${country.languages[Object.keys(country.languages)[0]]}</p>
          <p class="country__row"><span>💰</span>${Object.keys(country.currencies)[0]}</p>
        </div>
      </article>
    `;
  
    countriesContainer.insertAdjacentHTML('beforeEnd', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountry('portugal');
getCountry('peru');
getCountry('usa');


