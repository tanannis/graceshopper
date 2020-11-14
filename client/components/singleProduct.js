import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {fetchAddNewItemToCart, fetchUpdatedItemQuantity} from '../store/cart'
import UpdateProductForm from './updateProductForm'
import QuantityDropDown from './QuantityDropDown'
import {Container, Row, Col, Table} from 'react-bootstrap'

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
    const isAdmin = this.props.isAdmin

    if (this.state.loading === 'loading') {
      return <div>LOADING!!!</div>
    }

    return (
      <Container className="singleProductContainer">
        <Container className="singleProductBox">
          <Row>
            <Col sm={4}>
              <img src={product.imageUrl} className="product-pic" />
            </Col>
            <Col sm={8}>
              <div className="productName">
                <h3>{product.name}</h3>
              </div>
              <Table>
                <tbody>
                  <tr>
                    <td className="tableHeader">Price:</td>
                    <td>{product.priceDisplay}</td>
                  </tr>
                  <tr>
                    <td className="tableHeader">Description:</td>
                    <td>{product.description}</td>
                  </tr>
                  <tr>
                    <td className="tableHeader">Quantity: </td>
                    <td>
                      <QuantityDropDown
                        product={this.props.product}
                        bttnText="Add to cart!"
                      />{' '}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        {isAdmin ? (
          <Container className="updateProductBox">
            <UpdateProductForm />
          </Container>
        ) : (
          ''
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    cart: state.cart,
    isAdmin: state.user.userType === 'admin'
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
