import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCart,
  fetchUpdatedItemQuantity,
  fetchDeleteItemFromCart
} from '../store/cart'

class CheckoutPage extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
  }

  async handleDeleteItemFromCart(id) {
    await this.props.deleteItemFromCart(id)
  }

  async handleUpdateQuantity(id) {
    await this.props.updateQuantity(id)
  }

  render() {
    console.log(this.props)
    const cart = this.props.cart || {}
    const products = cart.products
    let total = 0
    if (products) {
      total = products.reduce(function(accum, current) {
        return accum + current.price * current.orderItem.quantity
      }, 0)
    }
    if (products && products.length) {
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
          <form onSubmit={this.handleSubmit}>
            <p>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Name"
              />

              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                placeholder="Price"
              />

              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Description"
              />

              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                placeholder="Quantity in Stock"
              />

              <input
                type="text"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
                placeholder="Image URL"
              />
              <button type="submit">Place Order</button>
            </p>
          </form>
        </>
      )
    } else {
      return <p>Oops! No products in cart yet! Add some items and come back!</p>
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  updateQuantity: id => dispatch(fetchUpdatedItemQuantity(id)),
  deleteItemFromCart: id => dispatch(fetchDeleteItemFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
