// Global Variables
const countriesList = document.getElementById("countries");
let countries; // will contain "fetched" data

// Event Listeners
countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("https://restcountries.com/v3/all")
  .then(res => res.json())
  .then(data => initialize(data))
  .catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  let options = "";
  countries.forEach(country => options += `<option value="${country.cca3}">${country.name.common}</option>`);
  countriesList.innerHTML = options;
  countriesList.selectedIndex = Math.floor(Math.random() * countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.cca3 === countryByAlpha3Code);
  const [currentyKey, currencyValue] = Object.entries(countryData.currencies)[0];
  document.querySelector("#flag-container img").src = countryData.flags[0];
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("dialing-code").innerHTML = countryData.idd.suffixes.map(suffix => `${countryData.idd.root}${suffix}`);
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = `${currencyValue.name} (${currentyKey})`
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
}