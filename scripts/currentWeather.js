import nicolasApi from "./nicolasAPIkey.js";
import parsed from "./search.js";

let initialCity;
if(parsed === null){
  initialCity = "vancouver"
}else if (parsed.length >= 1){
  initialCity = parsed[0]
}

export const loadData = () => {
  const element = document.querySelector("#currentWeather");
  return (element.innerHTML = `
    <h1>${nameOfCity},${result.sys.country}</h1>
    <h2>${temperatureRealTime}&#8451</h2>
    <h3>H:${highestTemperature}&#8451</h3>
    <h3>L:${lowestTemperature}&#8451</h3>
    <h3>${result.weather[0].description}</h3>
    <h3>Humidity:${result.main.humidity}%</h3>
    <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="result.weather[0].description"> </img>
    <favorite-star></favorite-star>`);
};

// Fetching API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${initialCity}&appid=${nicolasApi}&units=metric`)

.then((response) => response.json())

.then((result) =>{
  //Error check
    if (result.cod !== 200) {
      throw new Error();
    }
  // Variables
  const lowestTemperature = Math.floor(result.main.temp_min)
  const highestTemperature = Math.floor(result.main.temp_max);
  const temperatureRealTime = Math.floor(result.main.temp);
  const nameOfCity = result.name

  const loadData = () =>{
    const element=document.querySelector("#currentWeather")
    return (element.innerHTML = `
    <h1>${nameOfCity},${result.sys.country}</h1>
    <h2>${temperatureRealTime}&#8451</h2>
    <h3>H:${highestTemperature}&#8451</h3>
    <h3>L:${lowestTemperature}&#8451</h3>
    <h3>${result.weather[0].description}</h3>
    <h3>Humidity:${result.main.humidity}%</h3>
    <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="result.weather[0].description"> </img>
    <favorite-star></favorite-star>`);
  }
  loadData();

  // const favoriteStars = document.querySelector('#fav')
  // if(!(parsed === null)){
  //   if(parsed.includes("Vancouver") === true){
  //     favoriteStars.classList.add("selected")
  //   }else{
  //     favoriteStars.classList.remove('selected')
  //   }}
  })

.catch((err) => {
  console.log(err);
})


// Input Data
let inputCity=document.querySelector("#searchTextField");
let searchBtn=document.querySelector("#searchBtn");
searchBtn.addEventListener('click', ()=>{
  const favoriteStars=document.querySelector('#fav')
  let inputValue=inputCity.value;
  let firstName;
  if(inputValue.indexOf(",") > -1){
    firstName= inputValue.split(',')[0];
  }else{
    firstName=inputValue.split(' ')[0]
  }
  if(!(parsed === null)){
    if(parsed.includes(firstName) === true){
      favoriteStars.classList.add("selected")
    }else{
      favoriteStars.classList.remove('selected')
    }}
  console.log(firstName);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${firstName}&appid=${nicolasApi}&units=metric`)
  .then((response) => response.json())

  .then((result) =>{
    //Error check
    if (result.cod !== 200) {
      throw new Error();
    }
    // Variables
    const lowestTemperature = Math.floor(result.main.temp_min);
    const highestTemperature = Math.floor(result.main.temp_max);
    const temperatureRealTime = Math.floor(result.main.temp);
    const nameOfCity = result.name;

    const loadData = () => {
      const element = document.querySelector("#currentWeather");
      return (element.innerHTML = `
      <h1>${nameOfCity},${result.sys.country}</h1>
      <h2>${temperatureRealTime}°</h2>
      <h3>H:${highestTemperature}°</h3>
      <h3>L:${lowestTemperature}°</h3>
      <h3>${result.weather[0].description}</h3>
      <h3>Humidity:${result.main.humidity}%</h3>
      <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="result.weather[0].description"> </img>
      <favorite-star></favorite-star>`);
    };
    loadData();
  }) ;
})

 