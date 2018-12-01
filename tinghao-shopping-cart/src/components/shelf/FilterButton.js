import React, { Component } from 'react';
import { capitalize } from '../../util'

class FilterButton extends Component {
  constructor(props) {
    super(props);

    const { filter } = this.props;

    const colors = {
      yellow:'#FFDC00',
      black: '#111111',
      gray: '#AAAAAA',
      blue: '#0074D9',
      pink: 'pink',
      darkGray: '#3e3e3e'
    }

    this.state = {
      checked: false,
      buttonStyle: {
        backgroundColor: ['men', 'lady'].indexOf(filter) > -1 ? colors['darkGray']: colors[filter],
        color: 'white',
        opacity: 1
      }
    }
  }

  handleChange = () => {
    const { checked } = this.state;
    const { filter, type, handleCheckboxChange } = this.props;

    // reverse checked
    this.setState({
      checked: !this.state.checked
    })
    // submite filter,type and state
    handleCheckboxChange(filter, type, !checked);
  }

  render() {
    const { filter } = this.props;
    const { checked, buttonStyle } = this.state;
    return (
        <div className="filter__button" id={filter}>
          <label >
            <input
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleChange}
            />
            <span className="button__type" style={checked ? buttonStyle : null}>
              {capitalize(filter)}
            </span>
          </label>
        </div>
    );
  }
}

export default FilterButton ;
