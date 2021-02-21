// INITIALIZE STORAGE
const storage = new Storage();
// Get Location from storage
const storageLocation = storage.getLocationData();
// INITIALIZE WEATHER
const weather = new Weather(storageLocation.city);
// INITIALIZE UI
const ui = new UI();

//
const spinner = document.querySelector('#spinner-container');

// COLLECT LATITUDE AND LONGITUDE DATA (DESKTOP)
const collectDataDesktop = ({ lat, long, location }) => {
  weather.getAllWeatherData(lat, long).then(({ responseData }) => {
    spinner.style.display = 'none';
    // POPULATE WEATHER (DESKTOP)
    ui.populateCurrentWeatherDesktop(responseData, location);
    // Populate Location history
    storage.setLocationHistory(location.city);
    ui.populateHistoryDesktop();
  });
};

// COLLECT LATITUDE AND LONGITUDE DATA (MOBILE)
const collectDataMobile = ({ lat, long, location }) => {
  weather.getAllWeatherData(lat, long).then(({ responseData }) => {
    spinner.style.display = 'none';
    // POPULATE WEATHER (MOBILE)
    storage.setLocationHistory(location.city);
    ui.populateCurrentWeatherMobile(responseData, location);
  });
};

// GET WEATHER (DESKTOP)
const getWeatherDesktop = () => {
  weather
    .getLatLong()
    .then(({ responseData }) => {
      spinner.style.display = 'none';

      let coordinates = {
        lat: responseData.coord.lat,
        long: responseData.coord.lon,
        location: {
          city: responseData.name,
          country: responseData.sys.country,
        },
      };
      // Collect cooredinates and get weather
      collectDataDesktop(coordinates);
    })
    .catch((e) => {
      // SHOW ERROR MESSAGE
      ui.showErrorMessage('coordinates not found');
      // Render previous location
      const history = JSON.parse(localStorage.getItem('history'));
      weather.changeLocation(history[0]);
      storage.setLocationData(history[0]);
      getWeatherDesktop();
    });
};

// GET WEATHER (MOBILE)
const getWeatherMobile = () => {
  weather
    .getLatLong()
    .then(({ responseData }) => {
      spinner.style.display = 'none';
      let coordinates = {
        lat: responseData.coord.lat,
        long: responseData.coord.lon,
        location: {
          city: responseData.name,
          country: responseData.sys.country,
        },
      };

      collectDataMobile(coordinates);
    })
    .catch((e) => {
      // Show error message as modal
      ui.showErrorModal('coordinates not found');
    });
};

// CLOSE MODAL
const closeModal = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  // Render previous location
  const history = JSON.parse(localStorage.getItem('history'));
  weather.changeLocation(history[0]);
  storage.setLocationData(history[0]);
  window.location.reload();
};

// CLOSE MODAL EVENTS
// Close modal with a click on a button
document.addEventListener('click', (e) => {
  if (e.target.className === 'close-modal') {
    closeModal();
  }
});
// Close modal with a click on overlay
document.addEventListener('click', (e) => {
  if (e.target.className === 'overlay') {
    closeModal();
  }
});
// Close Modal with esc key
document.addEventListener('keyup', (e) => {
  if (
    e.key === 'Escape' &&
    !document.querySelector('.modal').classList.contains('hidden')
  ) {
    closeModal();
  }
});

// CHANGE LOCATION FROM SEARCH FORM (DESKTOP)
if (document.querySelector('.search-form-desktop')) {
  document
    .querySelector('.search-form-desktop')
    .addEventListener('submit', (e) => {
      e.preventDefault();

      const cityToSearch = document
        .querySelector('.location-input')
        .value.toLowerCase();

      weather.changeLocation(cityToSearch);
      storage.setLocationData(cityToSearch);
      getWeatherDesktop();

      // Clear input fields
      document.querySelector('.location-input').value = '';
    });
}

// CHANGE LOCATION FROM SEARCH FORM (MOBILE)
document.querySelector('.mobile').addEventListener('click', (e) => {
  if (
    e.target.className === 'submit-mobile' ||
    e.target.id === 'submit-icon-mobile'
  ) {
    const cityToSearch = document
      .querySelector('.location-input-mobile')
      .value.toLowerCase();

    weather.changeLocation(cityToSearch);
    storage.setLocationData(cityToSearch);

    // get weather
    window.location.reload();
  }
});

// CHANGE / SEARCH LOCATION FROM HISTORY (DESKTOP)
document
  .querySelector('.location-history-desktop')
  .addEventListener('click', (e) => {
    if (e.target.className === 'search-history') {
      // Change location
      weather.changeLocation(e.target.id);
      // Set location to local storage
      storage.setLocationData(e.target.id);
      // Fetch and populate weather
      getWeatherDesktop();
    }
  });

// RENDER SEARCH PAGE AND POPULATE HISTORY
if (document.querySelector('.search-mobile')) {
  document.querySelector('.search-mobile').addEventListener('click', () => {
    // Get history from local storage & Render search page which includes history
    ui.renderSearchPageMobile();
  });
}

// CHANGE / SEARCH LOCATION FROM HISTORY (MOBILE)
document.querySelector('.mobile').addEventListener('click', (e) => {
  if (e.target.className === 'search-history') {
    // Change location
    weather.changeLocation(e.target.id);
    // Set location to local storage
    storage.setLocationData(e.target.id);
    // Reload page
    window.location.reload();
  }
});

// SHOW 24HRS WEATHER (DESKTOP)
if (document.querySelector('.next-hours-desktop')) {
  document
    .querySelector('.next-hours-desktop')
    .addEventListener('click', () => {
      // GET 24hrs WEATHER DATA
      weather.getLatLong().then(({ responseData }) => {
        spinner.style.display = 'none';
        let coordinates = {
          lat: responseData.coord.lat,
          long: responseData.coord.lon,
        };
        // FETCH HOURLY DATA
        weather
          .getAllWeatherData(coordinates.lat, coordinates.long)
          .then(({ responseData }) => {
            spinner.style.display = 'none';
            // POPULATE HOURLY DATA
            ui.populateHourlyWeatherDesktop(responseData.hourly);
          });
      });
    });
}

// SHOW 24HRS WEATHER (MOBILE)
const getHourlyWeatherMobile = () => {
  // GET 24hrs WEATHER DATA
  weather.getLatLong().then(({ responseData }) => {
    spinner.style.display = 'none';
    let coordinates = {
      lat: responseData.coord.lat,
      long: responseData.coord.lon,
    };
    // FETCH HOURLY DATA
    weather
      .getAllWeatherData(coordinates.lat, coordinates.long)
      .then(({ responseData }) => {
        spinner.style.display = 'none';
        // POPULATE HOURLY WEATHER
        ui.populateHourlyWeatherMobile(responseData.hourly);
      });
  });
};

// SHOW NEXT 7 DAYS WEATHER (DESKTOP)
if (document.querySelector('.next-days-desktop')) {
  document.querySelector('.next-days-desktop').addEventListener('click', () => {
    // GET DAILY WEATHER DATA
    weather.getLatLong().then(({ responseData }) => {
      spinner.style.display = 'none';
      let coordinates = {
        lat: responseData.coord.lat,
        long: responseData.coord.lon,
      };
      // FETCH DAILYDATA
      weather
        .getAllWeatherData(coordinates.lat, coordinates.long)
        .then(({ responseData }) => {
          spinner.style.display = 'none';
          // POPULATE DAILY DATA
          ui.populateDailyWeatherDesktop(responseData.daily);
        });
    });
  });
}

// SHOW NEXT 7 DAYS WEATHER (MOBILE)
if (document.querySelector('.next-days-mobile')) {
  document.querySelector('.next-days-mobile').addEventListener('click', () => {
    // GET DAILY WEATHER
    weather.getLatLong().then(({ responseData }) => {
      spinner.style.display = 'none';
      let coordinates = {
        lat: responseData.coord.lat,
        long: responseData.coord.lon,
      };
      // FETCH DAILYDATA
      weather
        .getAllWeatherData(coordinates.lat, coordinates.long)
        .then(({ responseData }) => {
          spinner.style.display = 'none';
          // POPULATE DAILY DATA
          ui.populateDailyWeatherMobile(responseData.daily);
        });
    });
  });
}

//

// RETURN TO HOME PAGE (DESKTOP)
if (document.querySelector('.right-div')) {
  document.querySelector('.right-div').addEventListener('click', (e) => {
    if (e.target.className === 'arrow-back-desktop') {
      window.location.reload();
    }
  });
}

// RETURN TO HOME PAGE (MOBILE)
if (document.querySelector('.mobile-container')) {
  document.querySelector('.mobile-container').addEventListener('click', (e) => {
    if (
      e.target.className === 'home-mobile' ||
      e.target.className === 'arrow-back-mobile'
    ) {
      window.location.reload();
    }
  });
}

// BROWSER RESIZE EVENT
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  if (width === 900) {
    spinner.style.display = 'block';
    window.location.reload();
  } else if (width == 901) {
    spinner.style.display = 'block';
    window.location.reload();
  }
});

// APP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  const width = window.innerWidth;

  if (width > 900) {
    getWeatherDesktop();
    ui.populateHistoryDesktop();
  } else if (width <= 900) {
    getWeatherMobile();
    getHourlyWeatherMobile();
  }
});
