import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {fetchAddNewItemToCart, fetchUpdatedItemQuantity} from '../store/cart'
import UpdateProductForm from './updateProductForm'
import QuantityDropDown from './QuantityDropDown'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: 'loading'
    }
    this.handleClick.bind(this)
  }
  handleClick = product => {
    let currentProductId = product.id
    let productsInCart = this.props.cart.products
    if (
      productsInCart.filter(item => item.id === currentProductId).length > 0
    ) {
      this.props.updateQuantity(currentProductId)
    } else {
      let newOrderItem = {
        quantity: 1,
        orderId: this.props.cart.id,
        productId: currentProductId
      }
      this.props.addNewItemToCart(newOrderItem)
    }
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
    this.setState({
      loading: 'ready'
    })
  }

  componentWillUnmount() {
    this.setState({
      loading: 'loading'
    })
  }

  render() {
    const product = this.props.product
    const cart = this.props.cart

    if (this.state.loading === 'loading') {
      return <div>LOADING!!!</div>
    }

    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} className="product-pic" />
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <button
          className="btn"
          type="button"
          onClick={() => this.handleClick(product)}
        >
          Add to Cart!
        </button>
        <QuantityDropDown
          product={this.props.product}
          bttnText="Add to cart!"
        />
        <div>
          <h3>Update Product Info:</h3>
          <UpdateProductForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addNewItemToCart: newItemToAdd =>
      dispatch(fetchAddNewItemToCart(newItemToAdd)),
    updateQuantity: id => dispatch(fetchUpdatedItemQuantity(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
