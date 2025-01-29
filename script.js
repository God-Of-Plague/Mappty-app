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
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // to add a marker on the map whenever we click on the map. we use eventlisterners which are provided by the api.
    map.on('click', function (mapevent) {
      console.log(mapevent);
      // when we click on mapevent is generated
      const { lat, lng } = mapevent.latlng; // variable separation using objects
      console.log(lat, lng);
      // this code will mark the map by using the latitude and longitude.
      // all popup options are from the documentation. check if you want to see.
      // all of those options determine the popup appear on top of location symbol. and class name is added to that as mentioned.[check it's styles in css]
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
          })
        )
        .setPopupContent('workout')
        .openPopup();
    });
  },
  function () {
    alert('not able to get the location');
  }
);
