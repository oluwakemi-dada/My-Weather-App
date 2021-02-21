class UI {
  populateCurrentWeatherDesktop(data, location) {
    const d = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // POPULATE TEMPERATURE
    document.querySelector(
      '.temperature-desktop'
    ).textContent = `${data.current.temp}°C`;

    // POPULATE LOCATION
    document.querySelector(
      '.location-desktop'
    ).textContent = `${location.city}, ${location.country}.`;

    // POPULATE DATE AND TIME
    document.querySelector('.date-desktop').textContent = `${
      (d.getHours() < 10 ? '0' : '') + d.getHours()
    } : ${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()} : ${
      (d.getSeconds() < 10 ? '0' : '') + d.getSeconds()
    } - ${days[d.getDay()]}, ${
      months[d.getMonth()]
    } ${d.getDate()}, ${d.getFullYear()}.`;

    // POPULATE WEATHER TYPE TEXT
    const text = `${data.current.weather[0].description}`;
    document.querySelector('.weather-type-text-desktop').textContent = `${
      text[0].toUpperCase() + text.slice(1)
    }`;

    // POPULATE WEATHER TYPE ICON
    document
      .querySelector('.weather-type-icon-desktop')
      .setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
      );

    // POPULATE HUMIDITY DESKTOP
    document.querySelector(
      '.humidity-desktop'
    ).textContent = `${data.current.humidity}%`;

    // POPULATE FEELS LIKE
    document.querySelector(
      '.feels-like-desktop'
    ).textContent = `${data.current.feels_like}°C`;

    // POPULATE WIND SPEED
    document.querySelector(
      '.wind-speed-desktop'
    ).textContent = `${data.current.wind_speed}m/s`;
  }

  populateCurrentWeatherMobile(data, location) {
    const d = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // POPULATE WEATHER LOCATION
    document.querySelector(
      '.city-and-country-mobile'
    ).textContent = `${location.city}, ${location.country}`;

    // POPULATE WEATHER ICON
    document
      .querySelector('.weather-icon-mobile')
      .setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
      );

    // POPULATE WEATHER DESCRIPTION
    const text = `${data.current.weather[0].description}`;
    document.querySelector('.weather-description-mobile').textContent = `${
      text[0].toUpperCase() + text.slice(1)
    }`;

    // POPULATE TEMPERATURE
    document.querySelector(
      '.weather-temp-mobile'
    ).textContent = `${data.current.temp}°C`;

    // POPULATE WIND
    document.querySelector(
      '.wind-mobile'
    ).textContent = `${data.current.wind_speed}m/s`;

    // POPULATE RELATIVE HUMIDITY
    document.querySelector(
      '.rh-mobile'
    ).textContent = `${data.current.humidity}%`;

    // POPULATE FEELS LIKE
    document.querySelector(
      '.feels-like-mobile'
    ).textContent = `${data.current.feels_like}°C`;

    // POPULATE DATE AND TIME
    document.querySelector('.date-mobile').textContent = `${
      (d.getHours() < 10 ? '0' : '') + d.getHours()
    }:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}:${
      (d.getSeconds() < 10 ? '0' : '') + d.getSeconds()
    } - ${days[d.getDay()]}, ${
      months[d.getMonth()]
    } ${d.getDate()}, ${d.getFullYear()}.`;
  }

  populateHistoryDesktop() {
    const history = JSON.parse(localStorage.getItem('history'));

    // Populate history from default data
    if (history === null) {
      const uiDefaultHistory = ['maitama', 'madrid', 'ikeja', 'barcelona'];
      uiDefaultHistory.forEach((currUiDefaultHistory) => {
        const defaultHistoryHTML = `<li class="search-history" id="${currUiDefaultHistory}">${
          currUiDefaultHistory[0].toUpperCase() + currUiDefaultHistory.slice(1)
        }</li>`;
        document
          .querySelector('.location-history-desktop')
          .insertAdjacentHTML('beforeend', defaultHistoryHTML);
      });
    } else {
      // Populate history from local storage
      const uiHistory = history.slice(0, 4);
      // Clear existing history and populate new history
      document.querySelector('.location-history-desktop').textContent = '';
      uiHistory.forEach((currUiHistory) => {
        const historyHTML = `<li class="search-history" id="${currUiHistory}">${
          currUiHistory[0].toUpperCase() + currUiHistory.slice(1)
        }</li>`;
        document
          .querySelector('.location-history-desktop')
          .insertAdjacentHTML('beforeend', historyHTML);
      });
    }
  }

  showErrorMessage(msg) {
    if (!document.querySelector('.error-msg')) {
      const errorHTML = `
      <p class="error-msg">${msg}</p>
    `;

      document
        .querySelector('.search-form')
        .insertAdjacentHTML('beforebegin', errorHTML);

      setTimeout(() => {
        document.querySelector('.error-msg').remove();
      }, 2000);
    } else {
      // DO NOTHING
    }
  }

  populateHourlyWeatherDesktop(hourlyData) {
    //CONTAINER
    document.querySelector(
      '.right-div'
    ).innerHTML = `<div class="hourly-daily-weather"></div>`;

    // BACK ARROW
    const arrowBack = `<div class="arrow-back-desktop">&larr;</div>`;

    document
      .querySelector('.right-div')
      .insertAdjacentHTML('afterbegin', arrowBack);

    // POPULATE HOURLY WEATHER
    hourlyData.forEach((currHourlyData) => {
      const d = new Date(currHourlyData.dt * 1000);
      const hours = d.getHours();
      const day = d.getDay();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      // Render html
      const twentyfourHrsWeatherHTML = `<div class="scroll-desktop">
        <div class="day-hourly">
          <p>${(hours < 10 ? '0' : '') + hours} : 00 </p>
          <p>(${days[day]})</p>
        </div>
        <img src="http://openweathermap.org/img/wn/${
          currHourlyData.weather[0].icon
        }@2x.png"  />
        <h2>${currHourlyData.temp}°C</h2>
      </div>`;

      document
        .querySelector('.hourly-daily-weather')
        .insertAdjacentHTML('beforeend', twentyfourHrsWeatherHTML);
    });
  }

  populateHourlyWeatherMobile(hourlyData) {
    // POPULATE HOURLY WEATHER
    hourlyData.forEach((currHourlyData) => {
      const d = new Date(currHourlyData.dt * 1000);
      const hours = d.getHours();
      const hourlyWeatherHTML = `
        <div class="hourly-mobile">
          <p class="next-hour-mobile">${
            (hours < 10 ? '0' : '') + hours
          } : 00 </p>
          <img
            class="weather-icon-mobile"
            src="http://openweathermap.org/img/wn/${
              currHourlyData.weather[0].icon
            }.png"
          />
          <p class="hourly-temp-mobile">${currHourlyData.temp}°C</p>
        </div>
       `;

      document
        .querySelector('.scroll-x')
        .insertAdjacentHTML('beforeend', hourlyWeatherHTML);
    });
  }

  populateDailyWeatherDesktop(dailyData) {
    //CONTAINER
    document.querySelector(
      '.right-div'
    ).innerHTML = `<div class="hourly-daily-weather"></div>`;

    // BACK ARROW
    const arrowBack = `<div class="arrow-back-desktop">&larr;</div>`;

    document
      .querySelector('.right-div')
      .insertAdjacentHTML('afterbegin', arrowBack);

    // POPULATE DAILY WEATHER
    dailyData.forEach((currDailyData) => {
      const d = new Date(currDailyData.dt * 1000);
      const date = d.getDate();
      const day = d.getDay();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      // Render html
      const dailyWeatherHTML = `<div class="scroll-desktop">
        <p> ${days[day]}, ${date}</p>
        <img src="http://openweathermap.org/img/wn/${currDailyData.weather[0].icon}@2x.png"  />
        <h2>${currDailyData.temp.day}°C</h2>
      </div>`;

      document
        .querySelector('.hourly-daily-weather')
        .insertAdjacentHTML('beforeend', dailyWeatherHTML);
    });
  }

  populateDailyWeatherMobile(dailyData) {
    //CONTAINER
    document.querySelector(
      '.mobile'
    ).innerHTML = `<div class="daily-weather-mobile"></div>`;

    // BACK ARROW
    const arrowBack = `<div class="arrow-back-mobile">&larr;</div>`;

    document
      .querySelector('.mobile')
      .insertAdjacentHTML('afterbegin', arrowBack);

    // POPULATE DAILY WEATHER
    dailyData.forEach((currDailyData) => {
      const d = new Date(currDailyData.dt * 1000);
      const date = d.getDate();
      const day = d.getDay();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      // Render html
      const dailyWeatherHTML = `<div class="scroll-mobile">
        <p> ${days[day]}, ${date}</p>
        <img src="http://openweathermap.org/img/wn/${currDailyData.weather[0].icon}@2x.png"  />
        <h2>${currDailyData.temp.day}°C</h2>
      </div>`;

      document
        .querySelector('.daily-weather-mobile')
        .insertAdjacentHTML('beforeend', dailyWeatherHTML);
    });
  }

  renderSearchPageMobile() {
    //CONTAINER
    document.querySelector(
      '.mobile'
    ).innerHTML = `<div class="search-n-history-mobile"></div>`;

    // BACK ARROW
    const arrowBack = `<div class="arrow-back-mobile">&larr;</div>`;

    document
      .querySelector('.mobile')
      .insertAdjacentHTML('afterbegin', arrowBack);

    // Search form mobile
    const searchFormMobile = `
      <div class="search-form-mobile search-form">
        <input class="location-input-mobile location-input" type="text" />
        <button class="submit-mobile"><i id="submit-icon-mobile" class="fas fa-search"></i></button>
      </div>
    `;

    // Insert search form
    document
      .querySelector('.search-n-history-mobile')
      .insertAdjacentHTML('afterbegin', searchFormMobile);

    // History
    const locationHistoryMobile = `
    <ul class="location-history-mobile"></ul>
    `;

    // Insert History
    document
      .querySelector('.search-n-history-mobile')
      .insertAdjacentHTML('beforeend', locationHistoryMobile);

    // Get history from local storage
    const history = JSON.parse(localStorage.getItem('history'));

    // Populate history from default data
    if (history === null) {
      const uiDefaultHistory = ['maitama', 'madrid', 'ikeja', 'barcelona'];
      uiDefaultHistory.forEach((currUiDefaultHistory) => {
        const defaultHistoryHTML = `<li class="search-history" id="${currUiDefaultHistory}">${
          currUiDefaultHistory[0].toUpperCase() + currUiDefaultHistory.slice(1)
        }</li>`;
        document
          .querySelector('location-history-mobile')
          .insertAdjacentHTML('beforeend', defaultHistoryHTML);
      });
    } else {
      // Populate history from local storage
      const uiHistory = history.slice(0, 4);
      // Clear existing history and populate new history
      document.querySelector('.location-history-mobile').textContent = '';
      uiHistory.forEach((currUiHistory) => {
        const historyHTML = `<li class="search-history" id="${currUiHistory}">${
          currUiHistory[0].toUpperCase() + currUiHistory.slice(1)
        }</li>`;
        document
          .querySelector('.location-history-mobile')
          .insertAdjacentHTML('beforeend', historyHTML);
      });
    }
  }

  showErrorModal(msg) {
    if (!document.querySelector('.modal')) {
      const errorMessage = `
        <div class="modal">
          <p>${msg}</p>
          <button class="close-modal">Okay</button>
        </div>
      `;
      document
        .querySelector('.mobile-container')
        .insertAdjacentHTML('afterend', errorMessage);

      const overlay = `
        <div class="overlay"></div>
      `;

      document.querySelector('.modal').insertAdjacentHTML('afterend', overlay);
    }
  }
}
