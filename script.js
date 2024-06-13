let weather;
let isDefined = 0;
let displayinC = 1;
const fetchData = async (place) => {
    try{
        // yes im too lazy to make an env file, dont judge
        let url = 'https://api.weatherapi.com/v1/current.json?key=58a4c9111493472199b132606241306&q=';
        place = place.toLowerCase();
        url += place;
        let weatherdata = await fetch(url);
        let parsedData = await weatherdata.json();
        displayValue(parsedData);
    }
    catch(e){
        console.log(e);
        alert('Place does not exist/Error. Try again later');
    }
}

const displayValue = (data) =>{
    weather = data;
    isDefined = 1;
    let placeDiv = document.getElementById('place');
    placeDiv.innerText = 'Place: ' + data.location.name;
    let countryDiv = document.getElementById('country');
    countryDiv.innerText = 'Country: ' + data.location.country;
    if(displayinC){
        let isDiv = document.getElementById('is');
        isDiv.innerText = 'Temp: ' + data.current.temp_c + '\u00B0C'
        let feelslikeDiv = document.getElementById('feels_like');
        feelslikeDiv.innerText = 'Feels like: ' + data.current.feelslike_c + '\u00B0C';
    }
    else{
        let isDiv = document.getElementById('is');
        isDiv.innerText = 'Temp: ' + data.current.temp_f + '\u00B0F'
        let feelslikeDiv = document.getElementById('feels_like');
        feelslikeDiv.innerText = 'Feels like: ' + data.current.feelslike_f + '\u00B0F';
    }
    let humidityDiv = document.getElementById('humidity');
    humidityDiv.innerText = 'Humidity: ' + data.current.humidity;
}

let toggleButton = document.getElementById('toggle');

toggleButton.addEventListener('click', () => {
    displayinC ^= 1;
    if(isDefined){
        displayValue(weather);
    }
});

let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
    let inputForm = document.getElementById('input');
    if(inputForm.value == ''){
        alert('Enter something damn');
    }
    else{
        fetchData(inputForm.value);
    }
});