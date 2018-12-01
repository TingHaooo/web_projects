import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectSort } from '../store/actions/sortActions'

class Sort extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: 'l-h'
    }
  }

  handleChange = (e) => {
    const selectMethod = e.currentTarget.value;
    const { selectSort } = this.props;
    console.log(selectMethod);
    this.setState({sort: selectMethod });
    selectSort(selectMethod)
  }

  render() {
    return (
      <div className="sort">
        <label htmlFor="price_sort">Sort by</label>
        <select id="price_sort" onChange={this.handleChange}>
          <option value="l-h">Lowest to Hightest</option>
          <option value="h-l">Hightest to Lowest</option>
        </select>
      </div>
    );
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    selectSort: (sortMethod) => dispatch(selectSort(sortMethod))
  }
}

export default connect(null, mapDispatchToProps)(Sort);
