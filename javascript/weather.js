class Weather {
  constructor(city) {
    this.key = '8daed1ebabe0bb67f94ab9800a60e330';
    this.city = city;
    this.spinner = document.querySelector('#spinner-container');
  }

  // Fetch LatLong from API
  async getLatLong() {
    this.spinner.style.display = 'block';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}`
    );

    const responseData = await response.json();

    return {
      responseData,
    };
  }

  // Fetch Weather from API
  async getAllWeatherData(lat, long) {
    this.spinner.style.display = 'block';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${this.key}`
    );

    const responseData = await response.json();

    return {
      responseData,
    };
  }

  // Change Location
  changeLocation(city) {
    this.city = city;
  }
}
