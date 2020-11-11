import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/singleProduct'

class NewProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      imageUrl: ''
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
    this.props.addProduct(this.state)
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
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Product Name"
            />

            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              placeholder="Price"
            />

            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Description"
            />

            <input
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
              placeholder="Quantity in Stock"
            />

            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
              placeholder="Image URL"
            />
            <button type="submit">Submit Product</button>
          </p>
        </form>
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
