import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, fetchCheckoutCart} from '../store/cart'
import Confirmation from './Confirmation'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      addressLineOne: '',
      city: '',
      state: '',
      zipCode: '',
      orderProcessed: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToken = this.handleToken.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    let cart = {...this.props.cart}
    if (this.state.firstName !== '') {
      cart.firstName = this.state.firstName
    }
    if (this.state.lastName !== '') {
      cart.lastName = this.state.lastName
    }
    if (this.state.addressLineOne !== '') {
      cart.addressLineOne = this.state.addressLineOne
    }
    if (this.state.city !== '') {
      cart.city = this.state.city
    }
    if (this.state.state !== '') {
      cart.state = this.state.state
    }
    if (this.state.zipCode !== '') {
      cart.zipCode = this.state.zipCode
    }
    console.log(cart)
    await this.props.checkoutCart(cart)
    this.setState({
      firstName: '',
      lastName: '',
      addressLineOne: '',
      city: '',
      state: '',
      zipCode: '',
      orderProcessed: true
    })
  }

  async componentDidMount() {
    await this.props.getCart()
  }

  async handleToken(token) {
    let cart = {...this.props.cart}
    token.cart = cart
    // console.log({token})
    await this.props.checkoutCart(token)
  }

  render() {
    const cart = this.props.cart || {}
    const products = cart.products
    let total = 0
    if (products) {
      total = products.reduce(function(accum, current) {
        return accum + current.price * current.orderItem.quantity
      }, 0)
    }
    if (!this.state.orderProcessed && products && products.length) {
      return (
        <>
          <h2>Checkout page!</h2>
          <div className="orderSummary">
            <p>Order Summary:</p>
            <ul>
              {products.map(product => {
                return (
                  <li key={product.id}>
                    {product.name} ({product.orderItem.quantity}) - ${
                      product.price
                    }
                  </li>
                )
              })}
            </ul>
            Total Price: ${total}
          </div>
          {/* <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              placeholder="Last Name"
            />

            <input
              type="text"
              name="addressLineOne"
              value={this.state.addressLineOne}
              onChange={this.handleChange}
              placeholder="Address"
            />

            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              placeholder="City"
            />

            <input
              type="text"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
              placeholder="State"
            />

            <input
              type="text"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
              placeholder="Zipcode"
            /> */}
          {/* <button type="submit">Place Order</button> */}
          {/* </form> */}
          {/* <ElementsConsumer>
      {({elements, stripe}) => (
        <StripeForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer> */}
          <StripeCheckout
            stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
            token={this.handleToken}
            billingAddress
            shippingAddress
            amount={total * 100}
          />
        </>
      )
    } else {
      return <Confirmation />
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  checkoutCart: cart => dispatch(fetchCheckoutCart(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
