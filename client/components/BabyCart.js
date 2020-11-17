import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Cart2} from 'react-bootstrap-icons'
import {NavLink} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

export class BabyCart extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
  }

  render() {
    const cart = this.props.cart || {}
    const products = cart.products
    let numOfProducts = 0
    if (products) {
      numOfProducts = products.reduce(function(accum, current) {
        return accum + current.orderItem.quantity
      }, 0)
    }

    return (
      <Nav.Link as={NavLink} to="/cart">
        <Cart2 /> {numOfProducts}
      </Nav.Link>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(BabyCart)
