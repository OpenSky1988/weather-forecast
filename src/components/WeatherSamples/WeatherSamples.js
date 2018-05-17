import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WeatherSamples.css';

export class WeatherSamples extends Component {
  componentWillMount() {
    this.props.renderCities();
  }

  render() {
    return (
      <div>
        <div className="sectiontitle">
            <h2>ПОГОДА НА СЕГОДНЯ</h2>
          </div>
          <section id="weather">
            {this.props.displyCities()}
          </section>
      </div>
    );
  }
};

WeatherSamples.propTypes = {
  displyCities: PropTypes.func.isRequired,
  renderCities: PropTypes.func.isRequired,
};

export default WeatherSamples;
