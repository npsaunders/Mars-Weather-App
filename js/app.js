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

$('form').on('submit', handleGetData);

function handleGetData(event) {
  event.preventDefault();
  // calling preventDefault() on a 'submit' event will prevent a page refresh  
  userInput = $inputSol.val();
  //Need to validate input
  //valid input >0, integer, max = today's date converted to sols

  // getting the user input
  $.ajax({
    url: 'https://api.maas2.apollorion.com/' + userInput
  }).then(
    (data) => {
      marsWeatherData = data;
      render();
    },
    (error) => {
      console.log('bad request', error);
    }
  );
}

function render() {
  $earthDt.text(marsWeatherData.terrestrial_date.slice(0, 9));
  $min_temp.text(marsWeatherData.min_temp);
  $max_temp.text(marsWeatherData.max_temp);
  $sunrise.text(marsWeatherData.sunrise);
  $sunset.text(marsWeatherData.sunset);
  $atmCond.text(marsWeatherData.atmo_opacity);
  $season.text(marsWeatherData.season);
  $solNum.text(marsWeatherData.sol);
}