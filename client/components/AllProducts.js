import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {deleteProduct} from '../store/singleProduct'
import QuantityDropDown from './QuantityDropDown'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

export class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.getProducts()
  }

  async handleClick(id) {
    await this.props.deleteProduct(id)
    this.props.getProducts()
  }

  render() {
    const products = this.props.products || []
    const isAdmin = this.props.isAdmin

    return (
      <div className="productsBody">
        <div className="allProductsContainer">
          {products && products.length ? (
            products.map(product => {
              return (
                <Card style={{width: '18rem', margin: '1em'}} key={product.id}>
                  <Card.Header
                    as="a"
                    href={`/products/${product.id}`}
                    role="img"
                    alt={product.name}
                    className="productImage"
                    style={{backgroundImage: `url(${product.imageUrl})`}}
                  />
                  <Card.Body>
                    <a href={`/products/${product.id}`} className="link">
                      <Card.Title>{product.name}</Card.Title>
                    </a>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Price: {product.priceDisplay}</ListGroupItem>
                    <ListGroupItem id="quantityRow">
                      <div>Quantity: </div>
                      <QuantityDropDown
                        product={product}
                        bttnText="Add to cart!"
                      />
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link
                      href={`/products/${product.id}`}
                      className="link"
                    >
                      View Details
                    </Card.Link>
                    <br />
                    {isAdmin && (
                      <Button
                        id="cartButton"
                        variant="dark"
                        className="removeProductButton"
                        onClick={() => this.handleClick(product.id)}
                      >
                        Remove Product
                      </Button>
                    )}
                  </Card.Body>
                </Card>
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
  products: state.products,
  isAdmin: state.user.userType === 'admin'
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
