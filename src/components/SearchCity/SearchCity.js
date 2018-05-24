import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchCity.css';
import WeatherLoader from '../WeatherLoader/WeatherLoader';

export class SearchCity extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.city !== prevState.city) { //
      return {
        city: nextProps.city,
      };
    }

    return null;
  }

  componentDidMount() {
    this.props.renderCities('city');
  }

  componentDidUpdate(_, prevState) {
    if(prevState.city !== this.state.city) {
      this.props.renderCities('city');
    }
  }

  render() {
    return (
      <div id="search-result">
        <h1>Результат поиска:</h1>
        {this.props.loading && <WeatherLoader />}
        {this.props.displayCities()}
      </div>
    )
  }
}

SearchCity.propTypes = {
  city: PropTypes.arrayOf(
    PropTypes.string,
  ),
  loading: PropTypes.bool.isRequired,
  displayCities: PropTypes.func.isRequired,
  renderCities: PropTypes.func.isRequired,
};

export default SearchCity;
