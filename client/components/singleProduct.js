import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import UpdateProductForm from './updateProductForm'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: 'loading'
    }
    this.handleClick.bind(this)
  }
  handleClick = product => {
    /// handle click functionality goes here!
    /// check if user or session has a cart, if not create a cart
    /// Add Item to cart
    /// Add a number by the cart to confirm add or have pop-up saying added!
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
    console.log('PROPs', this.props)
    console.log('PRODUCT', this.props.product)
    console.log('CART', cart)

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
        <div>
          <h3>Update Product Info:</h3>
          <UpdateProductForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('STATE', state)
  return {
    product: state.singleProduct,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
