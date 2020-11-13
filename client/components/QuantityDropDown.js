/* eslint-disable react/no-array-index-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAddNewItemToCart, fetchUpdatedItemQuantity} from '../store/cart'

class QuantityDropDown extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: 'loading',
      selectedQuantity: 1
    }
    this.handleSubmit.bind(this)
    this.changeSelected.bind(this)
  }

  changeSelected = event => {
    this.setState({
      selectedQuantity: Number(event.target.value)
    })
  }

  handleSubmit = product => {
    let currentProductId = product.id
    let productsInCart = this.props.cart.products
    let productToUpdate = productsInCart.filter(
      item => item.id === currentProductId
    )
    if (productToUpdate.length > 0) {
      if (!this.props.renderLocation) {
        let orderToUpdate = productToUpdate[0].orderItem
        orderToUpdate.quantity =
          orderToUpdate.quantity + this.state.selectedQuantity
        this.props.updateQuantity(orderToUpdate)
      } else if (this.props.renderLocation === 'cart') {
        let orderToUpdate = productToUpdate[0].orderItem
        orderToUpdate.quantity = this.state.selectedQuantity
        this.props.updateQuantity(orderToUpdate)
      }
    } else {
      let newOrderItem = {
        quantity: this.state.selectedQuantity,
        orderId: this.props.cart.id,
        productId: currentProductId
      }
      this.props.addNewItemToCart(newOrderItem)
    }
  }

  componentDidMount() {
    this.setState({loading: 'ready'})
  }

  componentWillUnmount() {
    this.setState({
      loading: 'loading'
    })
  }

  render() {
    const product = this.props.product
    let quantityArray = new Array(product.quantity).fill(null)

    if (this.state.loading === 'loading') {
      return <div>LOADING!!!</div>
    }

    return (
      <div>
        <div>
          <select
            name="quantity"
            defaultValue="quantity"
            onChange={this.changeSelected}
          >
            <option value="" disabled />
            {quantityArray.map((element, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn"
          type="submit"
          onClick={() => this.handleSubmit(product)}
        >
          {this.props.bttnText}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewItemToCart: newItemToAdd =>
      dispatch(fetchAddNewItemToCart(newItemToAdd)),
    updateQuantity: id => dispatch(fetchUpdatedItemQuantity(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuantityDropDown)
