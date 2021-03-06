/* eslint-disable complexity */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAddNewItemToCart, fetchUpdatedItemQuantity} from '../store/cart'
import Button from 'react-bootstrap/Button'

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
      let orderToUpdate = productToUpdate[0].orderItem
      if (this.props.renderLocation !== 'cart') {
        console.log(orderToUpdate.quantity)
        orderToUpdate.quantity =
          orderToUpdate.quantity + this.state.selectedQuantity
      } else if (this.props.renderLocation === 'cart') {
        orderToUpdate.quantity = this.state.selectedQuantity
      }
      this.props.updateQuantity(orderToUpdate)
    } else {
      let newOrderItem = {
        quantity: this.state.selectedQuantity,
        orderId: this.props.cart.id,
        productId: currentProductId
      }
      this.props.addNewItemToCart(newOrderItem)
    }
  }

  getCurrentProduct() {
    let allProductsInCart = this.props.cart.products
    let currentProduct = allProductsInCart.filter(
      item => item.id === this.props.product.id
    )
    if (currentProduct.length > 0) {
      return currentProduct[0]
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
    // LOADING CHECK
    if (this.state.loading === 'loading') {
      return <div>LOADING!!!</div>
    }

    // VARIABLES FOR EASE OF USE
    const product = this.props.product

    // DETERMINING NUM CURRENT ITEM IN CART ALREADY (CONSIDER MAKING RE_USABLE FUNCTION TO USE WITH SUBMIT)
    let itemsAlreadyInCart = 0
    let currentProductId = product.id
    let productsInCart = this.props.cart.products || []
    let productToUpdate = productsInCart.filter(
      item => item.id === currentProductId
    )
    if (productToUpdate.length > 0) {
      itemsAlreadyInCart = productToUpdate[0].orderItem.quantity
    }

    // DETERMINING DROP-DOWN LENGTH
    let dropDownLength
    if (this.props.renderLocation !== 'cart') {
      dropDownLength = product.quantity - itemsAlreadyInCart || 0
    } else {
      dropDownLength = product.quantity || 0
    }
    if (dropDownLength === 0 && this.props.renderLocation !== 'cart') {
      return <div>All available items in cart!</div>
    }
    if (dropDownLength < 0) {
      dropDownLength = 0
    }

    let quantityArray = new Array(dropDownLength).fill(null)

    return (
      <div className="dropDownRow">
        {!this.props.renderLocation ? <div>Quantity:</div> : <></>}
        <div>
          <select
            name="quantity"
            defaultValue="quantity"
            onChange={this.changeSelected}
            className="quantitySelect"
          >
            <option value="" disabled />
            {quantityArray.map((element, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="buttonBox">
          <Button
            id="cartButton"
            variant="dark"
            type="submit"
            onClick={() => this.handleSubmit(product)}
          >
            {this.props.bttnText}
          </Button>
        </div>
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
