import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import QuantityDropDown from './QuantityDropDown'

export class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.getProducts()
  }

  async handleClick(id) {
    await this.props.deleteProduct(id)
  }

  render() {
    const products = this.props.products || []
    console.log(products)
    return (
      <div className="productsBody">
        <div className="allProductsContainer">
          {products && products.length ? (
            products.map(product => {
              if (product.quantity) {
                return (
                  <div className="productBox" key={product.id}>
                    <h2 className="productName">
                      <a href={`/products/${product.id}`}>{product.name}</a>
                    </h2>
                    <a href={`/products/${product.id}`}>
                      <img className="productImages" src={product.imageUrl} />
                    </a>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <p>Quantity:</p>
                    <QuantityDropDown
                      product={product}
                      bttnText="Add to cart!"
                    />
                    <button
                      type="button"
                      className="removeProductButton"
                      onClick={() => this.handleClick(product.id)}
                    >
                      Remove Product
                    </button>
                  </div>
                )
              }
            })
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
