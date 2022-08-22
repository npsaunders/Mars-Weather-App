//console.log JSON return data and comment out. Use to get pieces of data
//declare variables
//connect to api using ajax
//listen for submit button to be clicked
//create functions to populate the table
//    do error checking/try-catch-finally-throw
//Clear out the input field
// -- Example --
// console.log('https://api.maas2.apollorion.com/');
// ----  Return JSON data   
//     ** denotes data needed
//
// {
//   "status": 200,
//   "id": 3251,
//   "terrestrial_date": "2022-03-24T00:00:00.000Z",
//   "ls": 195,
// **  "season": "Month 7",
// **  "min_temp": -68,
// **  "max_temp": -5,
//   "pressure": 760,
//   "pressure_string": "Higher",
//   "abs_humidity": null,
//   "wind_speed": null,
// **  "atmo_opacity": "Sunny",
// **  "sunrise": "05:18",
// **  "sunset": "17:22",
//   "local_uv_irradiance_index": "Moderate",
//   "min_gts_temp": -66,
//   "max_gts_temp": 5,
//   "wind_direction": null,
// **  "sol": 3423,
//   "unitOfMeasure": "Celsius",
//   "TZ_Data": "America/Port_of_Spain"}
//
//

// Show the main content if JavaScript is enabled.
// If JavaScript can't be loaded, only show the error image
$('#main').css('display', 'flex');

let marsWeatherData, userInput;

const $earthDt = $('#earthDt');
const $min_temp = $('#minTemp');
const $max_temp = $('#maxTemp');
const $sunrise = $('#sunrise');
const $sunset = $('#sunset');
const $atmCond = $('#atmCond');
const $season = $('#season');
const $inputSol = $('input[type="text"]');
const $solNum = $('#solNum');

$('form').on('submit', returnDataAndDisplay);

function returnDataAndDisplay(event) {
  //prevents page refresh after clicking the submit button
  event.preventDefault();
  userInput = $inputSol.val();
  if (userInput === '') {
    userInput = '1'
  }


  // AJAX call to get data
  $.ajax({
    url: 'https://api.maas2.apollorion.com/' + userInput
  }).then(
    // if ok then continue to update the DOM
    (data) => {
      marsWeatherData = data;
      updateDom();
    },
    // Error. There was an issue. Notify the user.
    (error) => {
      alert("There was an issue with data retrieval.")
    }
  );
}

function updateDom() {
  $earthDt.text(marsWeatherData.terrestrial_date.slice(0, 10));
  $min_temp.text(marsWeatherData.min_temp);
  $max_temp.text(marsWeatherData.max_temp);
  $sunrise.text(marsWeatherData.sunrise);
  $sunset.text(marsWeatherData.sunset);
  $atmCond.text(marsWeatherData.atmo_opacity);
  $season.text(marsWeatherData.season);
  $solNum.text(marsWeatherData.sol);
}