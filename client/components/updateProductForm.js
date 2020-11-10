import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProduct} from '../store/singleProduct'

class UpdateSingleProduct extends React.Component {
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
    this.props.updateProductData(this.state)
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
          <p>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Name"
            />

            <input
              type="text"
              name="address"
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
          </p>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProductData: product => dispatch(fetchUpdatedProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(UpdateProductForm)
