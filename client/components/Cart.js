import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Table} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import QuantityDropDown from './QuantityDropDown'
import {
  fetchCart,
  fetchUpdatedItemQuantity,
  fetchDeleteItemFromCart
} from '../store/cart'

export class Cart extends React.Component {
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
        <div className="cart">
          <div>
            <h4>
              You have {numOfProducts} items in your cart. Check out soon before
              they sell out!
            </h4>
          </div>
          <div className="cartContainer">
            {products.map(product => {
              return (
                <Row key={product.id} className="cartRow">
                  <Col sm={30}>
                    <img src={product.imageUrl} className="cartProductImage" />
                  </Col>
                  <Col sm={80}>
                    <div className="productName">
                      <h3>{product.name}</h3>
                    </div>
                    <Table>
                      <tbody>
                        <tr>
                          <td className="tableHeader">Price:</td>
                          <td>{product.priceDisplay}</td>
                        </tr>
                        <tr>
                          <td className="tableHeader">Quantity: </td>
                          <td>
                            {product.orderItem.quantity}
                            <QuantityDropDown
                              product={product}
                              bttnText="Update Quantity"
                              renderLocation="cart"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tableHeader">Remove from Cart: </td>
                          <td>
                            <Button
                              id="cartButton"
                              variant="dark"
                              onClick={() =>
                                this.handleDeleteItemFromCart(product.id)
                              }
                            >
                              Remove Item
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )
            })}
          </div>
          <h4>Subotal: ${(total / 100).toFixed(2)}</h4>
          <Button href="/checkout" id="cartButton" variant="dark">
            Check Out
          </Button>
        </div>
      )
    } else {
      return (
        <h4 className="emptyCart">
          Your shopping cart is currently empty! Head to{' '}
          <a className="link" href="/products">
            our goodies
          </a>{' '}
          page to grab some sweet treats!
        </h4>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
