import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './WeatherSamples.css';
import WeatherLoader from '../WeatherLoader/WeatherLoader';

export class WeatherSamples extends Component {
  componentDidMount() {
    this.props.renderCities('cities');
  }

  render() {
    return (
      <div>
        <div className="sectiontitle">
            <h2>ПОГОДА НА СЕГОДНЯ</h2>
          </div>
          <section id="weather">
            {this.props.loading && <WeatherLoader />}
            {this.props.displayCities() /* Ouputs array of cities */}
          </section>
      </div>
    );
  }
};

WeatherSamples.propTypes = {
  loading: PropTypes.bool.isRequired,
  displayCities: PropTypes.func.isRequired,
  renderCities: PropTypes.func.isRequired,
};

export default WeatherSamples;
