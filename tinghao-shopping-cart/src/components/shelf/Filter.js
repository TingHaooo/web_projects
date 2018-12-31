import React, { Component } from 'react';
import FilterButton from './FilterButton'
import { connect } from 'react-redux'
import { addFilter, removeFilter} from '../../store/actions/filterActions'

class Filter extends Component {

  handleClick = (filter, type, checkState) => {
    const { addFilter, removeFilter } = this.props;
    // state true -> add to filters (checked)
    // state false -> remove from filters (unchecked)
    checkState ?
    // add filter
    addFilter(filter, type)
    :
    // remove filter
    removeFilter(filter, type)
  }

  render() {
    const filters = {
      styles: ['men', 'lady'],
      colors: ['yellow', 'pink', 'gray', 'blue', 'black']
    };
    const stylesButtonList = filters.styles.map((style) => {
      return (
        <FilterButton
          filter={style}
          type="style"
          handleCheckboxChange={this.handleClick}
          key={style}
        />
      )
    });
    const colorButtonList = filters.colors.map((color) => {
      return (
        <FilterButton
          filter={color}
          type="color"
          handleCheckboxChange={this.handleClick}
          key={color}
        />
      )
    });

    return (
      <div className="filter">
        <div className="filter__row">
          {stylesButtonList}
        </div>
        <h3 className="filter__title">Color</h3>
        <div className="filter__row">
          {colorButtonList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFilter: (filter, type) => dispatch(addFilter(filter, type)),
    removeFilter: (filter, type) => dispatch(removeFilter(filter, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter) ;
