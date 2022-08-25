//This is the JSON return data from the API.  Use to get pieces of data
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
// If JavaScript can't be loaded, only show the <noscript> error image
$('#main').css('display', 'flex');

//get today's date in the form mm/dd/yyyy. This will be used to set the calendar date picker's last valid date that can be selected (no future dates).
const caldrMaxDate = new Date().toISOString().slice(0, 10);

//now set the max date attribute in the date picker.
$('#start').attr("max", caldrMaxDate);


// ---------  VARIABLES  ---------

//set maxDate to today's date. 
const maxDate = new Date();

//Curiosity start date = '2012-08-05' = 0 sols
const missionStartDate = new Date('2012-08-05');

let marsWeatherData, userInput;
const $earthDt = $('#earthDt');
const $min_temp = $('#minTemp');
const $max_temp = $('#maxTemp');
const $sunrise = $('#sunrise');
const $sunset = $('#sunset');
const $atmCond = $('#atmCond');
const $season = $('#season');
const $inputSol = $('input[type="date"]');
const $solNum = $('#solNum');

//Make sure jQuery is loaded
$(document).ready(function () {

  $('form').on('submit', returnDataAndDisplay);

  //  ---------  FUNCTIONS  ---------

  function returnDataAndDisplay(event) {
    //prevents page refresh after clicking the submit button
    event.preventDefault();

    //convert user input of yyyy-dd-mm to Martian sols.\
    userInput = terrestrialToSols($inputSol.val());

    // AJAX call to get data
    $.ajax({
      url: 'https://api.maas2.apollorion.com/' + userInput
    }).then(
      // if ok then continue to update the DOM
      (data) => {
        marsWeatherData = data;
        updateDom();
      },
      // If there's no data or an issue, just put in N/A for the values
      (error) => {
        $earthDt.text('Error');
        $min_temp.text('No');
        $max_temp.text('Data');
        $sunrise.text('Available');
        $sunset.text('For');
        $atmCond.text('That');
        $season.text('Date');
        $solNum.text('  ');
        // alert("There was an issue with data retrieval.")
      }
    );
  }

  function updateDom() {
    //only get the date in yyyy/mm/dd format
    $earthDt.text(marsWeatherData.terrestrial_date.slice(0, 10));

    //make sure min/max temps are values and not null. If null, use N/A
    let minTemp = "N/A";
    let maxTemp = "N/A";
    if (marsWeatherData.min_temp) minTemp = marsWeatherData.min_temp + '\xB0C';
    if (marsWeatherData.max_temp) maxTemp = marsWeatherData.max_temp + '\xB0C';

    //Temps are in Deg C.  use the \xBOC for degree symbol
    $min_temp.text(minTemp);
    $max_temp.text(maxTemp);
    $sunrise.text(marsWeatherData.sunrise);
    $sunset.text(marsWeatherData.sunset);
    $atmCond.text(marsWeatherData.atmo_opacity);
    $season.text(marsWeatherData.season);
    $solNum.text(marsWeatherData.sol);
  }

  // Purpose: Take the user entered Earth date yyyy-mm-dd format and convert it to sols
  // Param string of 'yyyy-mm-dd'
  // Returns a string in Martian sols
  function terrestrialToSols(enteredDate) {
    //first convert the date entered into milliseconds and subtract the 2 times to get elapsed time in milliseconds
    const elapsedTime = new Date(enteredDate).getTime() - missionStartDate.getTime();
    //convert milliseconds to Martian sols. Key difference is 1 sol is 24.65972 hours
    return Math.floor((elapsedTime / (1000 * 3600 * 24.65972222)));
  }

  //Change the h3 text when carousel button clicked
  //To do this, need to listen for a carousel button to be clicked.
  //Since there is a 0.6 second transition, need to set a timer
  //to assure the new slide is visible before putting the text

  //Listen for carousel button click. 
  //If clicked, delay 0.7secs before calling the function to change the h3 text.
  $('#carouselBut').click(function () {
    setTimeout(clickCarBut, 700);
  })

  //Set the h3 text based on which slide is visible
  function clickCarBut() {
    if ($('#tableForm').is(":visible")) {
      $('#line1').text("Curiosity Rover Historical Weather Readings");
      $('#line2').text("Utilizing the MAAS2 REST API");
    } else if ($('#carRover').is(":visible")) {
      $('#line1').text(" Rover Environmental Monitoring Station (REMS)");
      $('#line2').text("Courtesy NASA / JPL - Caltech");
    } else if ($('#weatherChart').is(":visible")) {
      $('#line1').text("Current Weather");
      $('#line2').text("Courtesy NASA / JPL - Caltech");
    } else {
      $('#line1').text("Season Chart");
      $('#line2').text("Courtesy NASA / JPL - Caltech");
    }
  }
})