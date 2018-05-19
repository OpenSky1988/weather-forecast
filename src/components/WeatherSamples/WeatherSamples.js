import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WeatherSamples.css';

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
            {this.props.displayCities()}
          </section>
      </div>
    );
  }
};

WeatherSamples.propTypes = {
  displayCities: PropTypes.func.isRequired,
  renderCities: PropTypes.func.isRequired,
};

export default WeatherSamples;
