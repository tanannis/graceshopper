import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProduct} from '../store/singleProduct'
import {Form} from 'react-bootstrap'

class UpdateProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let updatedProduct = {...this.props.product}
    if (this.state.name !== '') {
      updatedProduct.name = this.state.name
    }
    if (this.state.price !== '') {
      updatedProduct.price = parseFloat(this.state.price) * 100
    }
    if (this.state.description !== '') {
      updatedProduct.description = this.state.description
    }
    this.props.updateProductData(updatedProduct)
    this.setState({
      name: '',
      price: '',
      description: ''
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="productForm">
          <h4>Update Product Details:</h4>
          <Form.Group controlId="formProductName">
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Product Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              placeholder="Price"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Description"
            />
          </Form.Group>
          <button type="submit">Submit Update</button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProductData: product => dispatch(fetchUpdatedProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProductForm)
