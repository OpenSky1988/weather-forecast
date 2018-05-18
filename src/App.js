import React, { Component } from 'react';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import WeatherSamples from './components/WeatherSamples/WeatherSamples';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cities: [
        /*'Санкт-Петербург',
        'Москва',*/
        'Казань',
        'Самара',
        /*'Красноярск',
        'Чита',
        'Челябинск',
        'Оренбург',
        'Ростов-на-Дону',
        'Орск'*/
      ],
      loading: false,
      cityObjects: [],
    };

    this.changeCity = this.changeCity.bind(this);
    this.getCityForecast = this.getCityForecast.bind(this);
    this.getForecastData = this.getForecastData.bind(this);
    this.renderCities = this.renderCities.bind(this);
    this.modifyIconNumber = this.modifyIconNumber.bind(this);
    this.displayCities = this.displayCities.bind(this);
  }

  changeCity = value => {
    this.setState({ city: value });
  }

  getCityForecast = async (cityName) => {
    const dashedCityName = cityName.replace(/\s+/g, '-');

    const apiKey = 'c3UtEs951z4gYbCuWrAEpqTLhUICjXuV';
    const cityUri = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const uriToFetch = `${cityUri}?q=${dashedCityName}&language=ru&apikey=${apiKey}`;
    try {
      let response = await fetch(uriToFetch);
      if(response.ok) {
        let jsonResponse = await response.json();
        return this.getForecastData(jsonResponse[0].Key, jsonResponse[0].LocalizedName);
      }
      throw new Error('City request failed!');
    } catch (error) {
      console.log(error);
    }
  }

  getForecastData = async (cityKey, cityName) => {
    const apiKey = 'c3UtEs951z4gYbCuWrAEpqTLhUICjXuV';
    const forecastUri = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';
    const uriToFetch = `${forecastUri}${cityKey}?language=ru&metric=true&details=true&apikey=${apiKey}`;
    try {
      let response = await fetch(uriToFetch);
      if(response.ok) {
        let jsonResponse = await response.json();
        if (jsonResponse.DailyForecasts) {
          let cityData = jsonResponse.DailyForecasts.map(forecast => ({
              icon: this.modifyIconNumber(forecast.Day.Icon),
              iconPhrase: forecast.Day.IconPhrase,
              tempValue: forecast.Temperature.Maximum.Value,
              tempUnit: forecast.Temperature.Maximum.Unit,
              cityKey: cityKey,
              cityName: cityName
            })   
          );

          let renderCity = cityData.map(city => (
              <div
                className="weather"
                key={city.cityKey}>
                <h1>{city.cityName}</h1>
                <img
                  src={`http://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${city.icon}-s.png`}
                  alt={city.iconPhrase}
                  className="weathericon" />
                <h2>{`Температура: ${city.tempValue}°${city.tempUnit}`}</h2>
              </div>
            )
          );

          return renderCity;
        } else {
          return [];
        }
      }
      throw new Error('Forecast request failed!');
    } catch (error) {
      console.log(error);
    }
  }

  renderCities = async () => {
    if(this.state.cities) {
      const cityObj = await Promise.all(this.state.cities
        .map(city => this.getCityForecast(city)))
          .catch(e => {console.log(e)});
      this.setState({cityObjects: cityObj}); // Save response to this.cityObjects
    }
  }

  displayCities = () => {
    if(this.state.cityObjects) {
      return this.state.cityObjects;
    } else {
      return [];
    }
  }

  modifyIconNumber = iconNumber => 
    (('0' + iconNumber).slice(-2));

  render() {
    return (
      <div className="App">
        <SearchBar 
          city={this.state.city}
          changeCity={this.changeCity} />
        <div className="container">
        {<WeatherSamples
          renderCities={this.renderCities}
          displayCities={this.displayCities} />}
        </div>
      </div>
    );
  }
}

export default App;