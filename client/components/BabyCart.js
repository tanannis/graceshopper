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

    if (cart.products && cart.products.length) {
      return <div>Cart: {cart.products.length}</div>
    } else {
      return <div>Cart: 0</div>
    }
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
