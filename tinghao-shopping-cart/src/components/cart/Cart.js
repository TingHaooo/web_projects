import React, { Component } from 'react';
import CartProduct from './CartProduct'
import { connect } from 'react-redux'
import { checkout } from '../../store/actions/cartActions'
import { formatPrice, toTwoDecimalPlace} from '../../util'

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.cartQuantity !== prevProps.cartQuantity) {
      const { cartList, cartQuantity } = this.props;
      // calculate subtotal and pass to state
      var subtotal = 0;
      cartList.forEach(product => {
        subtotal += product.price * cartQuantity[product._id]
      });
      this.setState({
        subtotal: formatPrice(toTwoDecimalPlace(subtotal).toString()),
        isOpen: true
      });
    }
  }

  cartToggler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  cartCheckout = () => {
    const { checkout, cartList } = this.props;

    if (cartList.length === 0) {
      window.alert('Put some bags in the cart : )')
    } else {
      checkout();
      window.alert(`Check - Subtotal: ${this.state.subtotal}`)
    }
  }

  render() {
    const { cartList } = this.props;
    //map cartList
    const cartProducts = cartList.map(product => {
      return (
        <CartProduct product={product} key={product._id}/>
      )
    });

    return(
      <div className={this.state.isOpen ? "cart cart--opened" : "cart cart--closed"}>
        {
          this.state.isOpen ?
          (
            // cart is opened
            <button className="cart__toggler" onClick={this.cartToggler}>
              X
            </button>
          ):
          (
            // cart is closed
            <button className="cart__toggler" onClick={this.cartToggler}>
              <div className="bag">
                <span className="bag__quantity">{cartProducts.length}</span>
              </div>
            </button>
          )
        }

        <div className="cart__content">

          <div className="cart__header">
            <div className="bag">
              <span className="bag__quantity">{cartProducts.length}</span>
            </div>
            <div className="header__title">Bag</div>
          </div>

          <div className="cart__list">
            {
              cartProducts.length === 0 ?
                'Put some bags in the cart : )'
                :
                cartProducts
            }
          </div>

          <div className="cart__subtotal">
            <span className="subtotal__title">SUBTOTAL</span>
            <span className="subtotal__amout">{this.state.subtotal}</span>
          </div>

          <button className="cart__checkout" onClick={this.cartCheckout}>CHECKOUT</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cartList: state.cart.items,
    cartQuantity: state.cart.quantity
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: () => dispatch(checkout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
