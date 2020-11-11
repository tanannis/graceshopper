import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
//testing to see if this will push to github?

export class AllProducts extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  async componentDidMount() {
    await this.props.getProducts()
  }
  render() {
    const products = this.props.products || []

    return (
      // <div>
      //   <ul>
      //     {// products.length === 0
      //     !products && !products.length
      //       ? 'No products found'
      //       : products.map(product => (
      //           <li key={product.id}>
      //             <p>{product.name}</p>
      //             <Link to={`/products/${product.id}`}>
      //               <img src={product.imageUrl} />
      //             </Link>
      //             {/* <button onClick={() => this.props.deleteProduct(product.id)}>
      //               X
      //             </button> */}
      //           </li>
      //         ))}
      //   </ul>
      //   {/* <CreateProduct /> */}
      // </div>

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
                    // onClick={() => this.handleClick(product.id)}
                  >
                    X
                  </button>
                </div>
              )
            })
          ) : (
            <div>No products available</div>
          )}
        </div>
        {/* <div className="form">
          <h2>Add New Campus:</h2>
          <NewCampusForm />
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
  // deleteProduct: (id) => dispatch(deleteProduct(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
