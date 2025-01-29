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

/* According to the image first when the map loads constructor and getposition functions should be called.
  so when the object is created getposition function is called immediatley
  so the constructor should call the getposition function inside it.
  so execution starts from constructor and then getposition
*/

class App {
  // the variables defined outside are now inside
  #map;
  #mapEvent;

  constructor() {
    // Get user's position
    this._getPosition();

    // Attach event handlers
    // here we pass this as argument and it represents the current event object.
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  /* getposition will get the user's location using navigation.geolocation. but it will call two functions once when we successfully gets the location, and one if not  */
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        // when we call it normally like this._loadmap(),it is called as function
        // so location status is true then it should consider them as a regular function call not as a method call.
        // so we should call it with as below so that we can get the object passed on as this. otherwise it this keyword is undefined in loadmap
        // then we will face error in loadmap as it try to acess the object throuth this.#map and etc.,

        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    /* 
    this.#map.on('click', function (mapE) {...}), 
    the this inside the function callback refers to the global object (or undefined in strict mode) rather than the instance of the App class.
    Arrow functions do not have their own this context, so this will refer to the enclosing context (in this case, the instance of App).
    */
    this.#map.on('click', mapE => this._showForm(mapE));
  }

  // showform basically makes the form revel itself by removing the hidden class in it.so we will write the code which is in map.on listner before to this showform function
  _showForm(mapE) {
    this.#mapEvent = mapE; // Now `this` correctly refers to the `App` instance
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // toggle event basically contain toggling of form to hidden and viceversa.so the code in inputtype listner is written here
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // so when we call it with this._newWorkout.bind(this). where this is eventlistner object. so this is copied into e.
  // so e is event object
  _newWorkout(e) {
    e.preventDefault();

    // making all the input values empty
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    const { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng);
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const A = new App();
