import React from 'react'
import {connect} from 'react-redux'
import {fetchHistory} from '../store'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchHistory(this.props.match.params.userId)
  }
  render() {
    const orders = this.props.history || []
    return (
      <div>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p>{order.createdAt}</p>
              <div className="allProductsContainer">
                {order.products.map(product => (
                  <Card
                    style={{width: '18rem', margin: '1em'}}
                    key={product.id}
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
                      <a href={`/products/${product.id}`} className="link">
                        <Card.Title>{product.name}</Card.Title>
                      </a>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Price: {product.orderItem.priceDisplay}
                      </ListGroupItem>
                      <ListGroupItem id="quantityRow">
                        <div>Quantity: {product.orderItem.quantity}</div>
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  history: state.history
})

const mapDispatchToProps = dispatch => ({
  fetchHistory: userId => dispatch(fetchHistory(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
