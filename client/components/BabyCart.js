import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

export class BabyCart extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
  }

  // async handleClick(id) {
  //   await this.props.deleteProduct(id)
  //   this.props.getProducts()
  // }

  render() {
    const cart = this.props.cart[0] || []
    console.log('CART!', cart)
    console.log('PRODUCTS', cart.products)

    return (
      <div>
        <img
          src="https://static.thenounproject.com/png/304392-200.png"
          className="cart-img"
        />
        {cart.products && cart.products.length ? cart.products.length : 0}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart())
  // deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BabyCart)
