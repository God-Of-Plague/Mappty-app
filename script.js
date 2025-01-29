'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// to catch the current location coordinates we use geolocation as shown in the below
// navigatior.geolocation.getCurrentPosition will take 2 callback functions as arguments.
// 1st argument executed when the location is spotted. means true for location.
// 2nd location executed when there is an error or unable to spot the location. means false.

navigator.geolocation.getCurrentPosition(
  function (position) {
    alert('location spotted! charge everyone');
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // L is a global variable[which stores an object] from api we invoked with script Leaflet.js.
    // 'map' is the id of the tag which will display the map.
    // the arguments in setView are coords[which are latititude and longitude] and the zoom level[how much it should be]
    const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // this is the which will mark the marker on the map.[location symbol]
    L.marker(coords).addTo(map).bindPopup('A pretty css popup').openPopup();
  },
  function () {
    alert('not able to get the location');
  }
);
