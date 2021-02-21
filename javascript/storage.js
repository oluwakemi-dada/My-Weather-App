class Storage {
  constructor() {
    this.city;
    this.defaultCity = 'maitama';
  }

  getLocationData() {
    if (localStorage.getItem('city') === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem('city');
    }

    return {
      city: this.city,
    };
  }

  setLocationData(cityData) {
    this.city = localStorage.setItem('city', cityData);
    return this.city;
  }

  setLocationHistory(city) {
    // Change city to Lowercase
    let formatedCity = city.toLowerCase();
    // GET ITEMS
    let history;

    if (localStorage.getItem('history') === null) {
      history = ['madrid', 'ikeja', 'manchester'];
      localStorage.setItem('history', JSON.stringify(history));
    } else {
      history = JSON.parse(localStorage.getItem('history'));
    }

    // ADD ITEMS
    const currentHistory = JSON.parse(localStorage.getItem('history'));
    // Check for repetition
    if (
      currentHistory.indexOf(formatedCity) !== 0 &&
      currentHistory.indexOf(formatedCity) !== 1 &&
      currentHistory.indexOf(formatedCity) !== 2 &&
      currentHistory.indexOf(formatedCity) !== 3
    ) {
      currentHistory.unshift(formatedCity);
      localStorage.setItem('history', JSON.stringify(currentHistory));
    } else {
      // DO NOTHING
      // console.log('That city already exist in top 4');
    }
  }
}
