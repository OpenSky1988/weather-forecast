import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      city: value
    }, () => {
      if (this.state.city === '')
        this.props.changeCity(this.state.city);
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.props.changeCity(this.state.city);
  }

  render () {
    return (
      <main style={{ backgroundImage: `url("img/ryan-schroeder-328-unsplash.jpg")` }}>
        <h1>Введите город:</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.city}
            name="city"
            id="city"
            type="text"
          />
          <button type="submit">Поиск</button>
        </form>
      </main>
    );
  }
}

SearchBar.propTypes = {
  changeCity: PropTypes.func.isRequired,
};

export default SearchBar;

