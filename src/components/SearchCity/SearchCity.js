import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchCity.css';

export class SearchCity extends Component {
  render() {
    return (
      <div id="search-result">
        <h1>Результат поиска:</h1>
        {this.props.getCityForecast(this.props.city)}
      </div>
    )
  }
}

SearchCity.propTypes = {
  getCityForecast: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

export default SearchCity;
