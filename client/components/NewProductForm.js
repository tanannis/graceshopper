import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/singleProduct'
import {Form} from 'react-bootstrap'
// import NewProductConfirmation from './NewProductConfirmation'

class NewProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      imageUrl: '',
      productAdded: false
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
    this.props.addProduct({
      ...this.state,
      price: Number(this.state.price) * 100
    })
    this.setState({
      name: '',
      price: '',
      description: '',
      quantity: '',
      imageUrl: ''
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="productForm">
          <h4>New Item Details:</h4>
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
          <Form.Group>
            <Form.Control
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
              placeholder="Quantity in Stock"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
              placeholder="Image URL"
            />
          </Form.Group>
          <button type="submit">Submit Product</button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(NewProductForm)
