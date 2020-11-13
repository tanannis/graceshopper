import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {deleteProduct} from '../store/singleProduct'

export class AllProducts extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  async componentDidMount() {
    await this.props.getProducts()
  }

  async handleClick(id) {
    await this.props.deleteProduct(id)
    this.props.getProducts()
  }

  render() {
    const products = this.props.products || []

    return (
      <div className="productsBody">
        <div className="allProductsContainer">
          {products && products.length ? (
            products.map(product => {
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
                  <button
                    type="button"
                    className="removeProductButton"
                    onClick={() => this.handleClick(product.id)}
                  >
                    Remove Product
                  </button>
                </div>
              )
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
