import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProduct} from '../store/singleProduct'

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
      updatedProduct.price = parseFloat(this.state.price)
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Name"
          />

          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            placeholder="price"
          />

          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Description"
          />
          <button type="submit">Submit Update</button>
        </form>
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
