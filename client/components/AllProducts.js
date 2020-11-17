import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {deleteProduct} from '../store/singleProduct'
import QuantityDropDown from './QuantityDropDown'
import Loader from './Loader'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      filter: 'All Products'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getProducts()
    this.setState({isLoading: false})
  }
  async handleClick(id) {
    await this.props.deleteProduct(id)
    this.props.getProducts()
  }
  handleSelectChange(evt) {
    this.setState({
      filter: evt.target.value
    })
  }
  render() {
    const isAdmin = this.props.isAdmin
    const {filter} = this.state
    const products = this.props.products.filter(product => {
      if (filter === 'All Products') return product
      if (filter === 'Pastry') return product.productType === 'pastry'
      if (filter === 'Beverage') return product.productType === 'beverage'
    })
    if (this.state.isLoading) {
      return <Loader />
    }
    return (
      <>
        <div className="productFilter">
          <label htmlFor="productTypeFilter"> Category: </label>
          <select
            onChange={this.handleSelectChange}
            value={this.setState.filter}
            name="productTypeFilter"
          >
            <option>All Products</option>
            <option>Pastry</option>
            <option>Beverage</option>
          </select>
        </div>
        <div className="productsBody">
          <div className="allProductsContainer">
            {products && products.length ? (
              products.map(product => {
                return (
                  <div className="col-12 col-lg-3 col-md-6" key={product.id}>
                    <Card
                      className=""
                      // style={{width: '18rem', margin: '1em'}}
                    >
                      <Card.Header
                        as="a"
                        href={`/products/${product.id}`}
                        role="img"
                        alt={product.name}
                        className="productImage"
                        style={{backgroundImage: `url(${product.imageUrl})`}}
                      />
                      <Card.Body>
                        <Card.Link
                          href={`/products/${product.id}`}
                          role="img"
                          alt={product.name}
                          className="productImage"
                          style={{backgroundImage: `url(${product.imageUrl})`}}
                        />
                      </Card.Body>
                      <Card.Body>
                        <a href={`/products/${product.id}`} className="link">
                          <Card.Title>{product.name}</Card.Title>
                        </a>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          Price: {product.priceDisplay}
                        </ListGroupItem>
                        <ListGroupItem id="quantityRow">
                          {/* <div>Quantity:</div> */}
                          <QuantityDropDown
                            product={product}
                            bttnText="Add to cart!"
                          />
                        </ListGroupItem>
                      </ListGroup>
                      {isAdmin && (
                        <Card.Body>
                          <Button
                            id="cartButton"
                            variant="dark"
                            className="removeProductButton"
                            onClick={() => this.handleClick(product.id)}
                          >
                            Remove Product
                          </Button>
                        </Card.Body>
                      )}
                    </Card>
                  </div>
                )
              })
            ) : (
              <div>No products available</div>
            )}
          </div>
        </div>
      </>
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
