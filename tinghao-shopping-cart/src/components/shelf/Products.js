import React, { Component, Fragment} from 'react';
import memoize from "memoize-one";
import ProductSummary from './ProductSummary'
import { connect } from 'react-redux'
import { fetchProductAction } from '../../store/actions/productActions'
import Spinner from '../Spinner'
import Sort from '../Sort'
import { compare } from '../../util'

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  filter = (products, filters) => {
    // for key of filters, filter product
    Object.keys(filters).forEach(type => {
      if (filters[type].length !== 0) {
        products = products.filter(product => filters[type].indexOf(product[type]) > -1 )
      }
    })
  return products;
  }

  sort = (products, sortMethod) => {
    return products.sort(compare(sortMethod));
  }

  componentDidMount = () => {
    this.props.fetchProduct( () => {this.setState({loading: false})} )
  }

  render() {
    const { products, filters, sortMethod } = this.props;
    //filter products
    var filteredProducts = this.filter(products, filters);
    // //sort products
    var sortedFilteredProducts = this.sort(filteredProducts, sortMethod);


    const productList = sortedFilteredProducts.map(product => {
      return (
        <ProductSummary product={product} key={product._id} sort={sortMethod}/>
      )
    });

    return (
      <Fragment>
        <div className="products">
          {this.state.loading && <Spinner />}
          <Sort />
          {productList}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.items,
    filters: state.filters,
    sortMethod: state.sort.item
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (callback) => { dispatch(fetchProductAction(callback)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
