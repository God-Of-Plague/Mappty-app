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
  },
  function () {
    alert('not able to get the location');
  }
);
