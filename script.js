const cardContainer = document.querySelector('.card-container');

function renderCountries(data, style = '') {
  let countriesCard = ''; // Initialize countriesCard here
  data.forEach(country => {
    countriesCard += `
    <div class="card ${style}"> <!-- Add style class here -->
      <a href="country.html?country=${country.name.common}"><img src="${country.flags.svg}" alt="${country.flags.alt}"></a>
      <a href="country.html?country=${country.name.common}">
        <div class="info">
          <h2>${country.name.common}</h2>
          <p>Population: <span>${country.population.toLocaleString()}</span></p>
          <p>Region: <span>${country.region}</span></p>
          <p>Capital: <span>${country.capital}</span></p>
        </div>
      </a>
    </div>
  `;
  });
  cardContainer.innerHTML = countriesCard;
}

let countriesCard = '';
let countriesData = [];

if (cardContainer !== null) {
  fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
      countriesData = data;
      
      renderCountries(countriesData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  const selectRegion = document.querySelector('.filter');
  let region = '';
  selectRegion.addEventListener('input', (e) => {
    region = e.target.value;
    if (region == 'All') {
      countriesCard = '';
      renderCountries(countriesData);
    }
    else {
      const filteredCountries = countriesData.filter(country => country.region === region);
      countriesCard = '';
      renderCountries(filteredCountries);
    }
  });

  const input = document.getElementById('country');
  input.addEventListener('input', (e) => {
    const inputSearch = e.target.value;
    const filteredCountries = countriesData.filter(country => country.name.common.toLowerCase().includes(inputSearch.trim().toLowerCase()));
    if (inputSearch === '') { // If input is empty, render all countries
      renderCountries(countriesData);
    } else {
      renderCountries(filteredCountries, 'searched'); // Add 'searched' style class here
    }
  });
}

// Rest of your code...
const darkMode = document.querySelector('nav p');

let flag = 0;
darkMode.addEventListener('click', () => {
  if (flag === 0) {
    darkMode.parentElement.parentElement.classList.add('dark');
    darkMode.innerHTML = '<i class="ri-sun-line"></i> Light Mode';
    flag = 1;
    localStorage.setItem('darkMode', flag);
  } else {
    darkMode.parentElement.parentElement.classList.remove('dark');
    darkMode.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode'
    flag = 0;
    localStorage.setItem('darkMode', flag);
  }
})

const card = document.querySelectorAll('.card');
card.forEach(card => {
  card.addEventListener('click', () => {

  })
})

if (localStorage.getItem('darkMode') === '1') {
  darkMode.parentElement.parentElement.classList.add('dark');
  darkMode.innerHTML = '<i class="ri-sun-line"></i> Light Mode';
  // localStorage.setItem('darkMode', flag);
} else {
  darkMode.parentElement.parentElement.classList.remove('dark');
  darkMode.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode'
  // localStorage.setItem('darkMode', flag);
}