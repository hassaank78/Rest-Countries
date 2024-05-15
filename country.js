const countryDetails = document.querySelector('.country-details');
const countryName = new URLSearchParams(location.search).get('country');


async function fetchCountryData() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);

    if (!response.ok) {
      const p = document.createElement('p');
      p.classList.add('error');
      p.innerText = 'An Error Occured!';
      countryDetails.append(p);
    }

    const data = await response.json();
    console.log(data);
    const currencyCode = Object.keys(data[0].currencies)[0];
    const Languages = data[0].languages;
    let country = `<div class="country-details">
    <div class="flag">
      <img src="${data[0].flags.svg}" alt="">
    </div>
    <div class="details">
      <h1>${data[0].name.official}</h1>
      <div class="details-layout">
        <div>
          <p>Native Name: <span>${data[0].name.common}</span></p>
          <p>Population: <span>${data[0].population.toLocaleString()}</span></p>
          <p>Region: <span>${data[0].region}</span></p>
          <p>Sub Region: <span>${data[0].subregion}</span></p>
          <p>Capital: <span>${data[0].capital}</span></p>
        </div>
        <div>
          <p>Top Level Domain: <span>${data[0].tld}</span></p>
          <p>Currency: <span>${data[0].currencies[currencyCode].symbol}-${data[0].currencies[currencyCode].name}</span></p>
          <p>Languages: <span>
            ${Object.values(Languages).join(', ')}
          </span></p>
        </div>
      </div>
      <div class="border-countries">
        <p>Border Countries:
        ${data[0].borders ? data[0].borders.map(border => `<a href="country.html?country=/"${border}/"">${border}</a>`).join(' ') : `<a>None</a>`}
        </p>
    
      </div>
    </div>
    </div>`;
    countryDetails.innerHTML = country;
  } catch (error) {
    console.error('Error fetching country data:', error);
    return null;
  }
}

const data = fetchCountryData();
function goBack() {
  window.history.back();
}
