import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.props.changeCity(value);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.props.changeCity(value);
  }

  render () {
    return (
      <main style={{ backgroundImage: `url("img/ryan-schroeder-328-unsplash.jpg")` }}>
        <h1>Введите город:</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={this.props.city}
            name="city"
            id="city"
            type="text"
          />
          <div id="button" type="submit">Поиск</div>
        </form>
      </main>
    );
  }
}

SearchBar.propTypes = {
  changeCity: PropTypes.func.isRequired,
  city: PropTypes.string,
};

export default SearchBar;

