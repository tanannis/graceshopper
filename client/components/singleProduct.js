import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: 'loading'
    }
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
    // this.state.loading = 'ready'
  }

  componentWillUnmount() {
    // this.setState.loading = 'loading'
  }

  render() {
    const product = this.props.product
    console.log('PROPs', this.props)
    console.log('PRODUCT', this.props.product)

    if (this.state.loading === 'loading') {
      return <div>LOADING!!!</div>
    }

    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} className="product-pic" />
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <div>
          <h3>Update Product Info:</h3>
          {/* <UpdateProductForm /> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('STATE', state)
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
