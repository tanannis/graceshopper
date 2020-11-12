import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, fetchUpdatedItemQuantity} from '../store/cart'

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
  }

  // async handleClick(id) {
  //   await this.props.deleteProduct(id)
  //   this.props.getProducts()
  // }

  async handleUpdateQuantity(id) {
    await this.props.updateQuantity(id)
    this.props.getCart()
  }

  render() {
    const cart = this.props.cart || {}
    const products = cart.products
    let numOfProducts = 0
    let total = 0
    if (products) {
      total = products.reduce(function(accum, current) {
        return accum + current.price * current.orderItem.quantity
      }, 0)
      numOfProducts = products.reduce(function(accum, current) {
        return accum + current.orderItem.quantity
      }, 0)
    }

    if (products && products.length) {
      return (
        <div>
          <div>
            You have {numOfProducts} items in your cart. Check out soon before
            they sell out!
          </div>
          <div className="cartContainer">
            {products.map(product => {
              return (
                <div className="productContainer" key={product.id}>
                  <h3>{product.name}</h3>
                  <div className="productDetails">
                    <img src={product.imageUrl} />
                    <div className="productDetailsChild">
                      <p>Price: ${product.price}</p>
                      <p>
                        Quantity: {product.orderItem.quantity}{' '}
                        <span>
                          <button
                            type="button"
                            onClick={() =>
                              this.handleUpdateQuantity(product.id)
                            }
                          >
                            +
                          </button>
                        </span>
                      </p>
                      <button type="button">Remove from Cart</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <h3>Subotal: ${total}</h3>
          <button type="button">Check Out</button>
        </div>
      )
    } else {
      return <div>Shopping Cart Empty</div>
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  updateQuantity: id => dispatch(fetchUpdatedItemQuantity(id))
  // deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
