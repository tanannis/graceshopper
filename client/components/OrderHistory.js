import React from 'react'
import {connect} from 'react-redux'
import {fetchHistory} from '../store'
import {Table} from 'react-bootstrap'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchHistory(this.props.match.params.userId)
  }
  render() {
    const orders = this.props.history || []
    return (
      <div className="orderSummary">
        {orders.length === 0 ? (
          <h4 className="emptyCart">
            No orders yet! Head to{' '}
            <a className="link" href="/products">
              our goodies
            </a>{' '}
            page to grab some sweet treats!
          </h4>
        ) : (
          <ol>
            {orders.map(order => (
              <li key={order.id}>
                <p>Date ordered: {order.updatedAt}</p>
                <p>Shipping Information:</p>
                <p>
                  {order.name}
                  <br />
                  {order.addressLine1}
                  <br />
                  {order.city}, {order.state}
                </p>
                <Table striped bordered hover size="small" id="orderHistory">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                    {order.products.map(product => {
                      return (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.priceDisplay}</td>
                          <td>{product.orderItem.quantity}</td>
                        </tr>
                      )
                    })}
                  </thead>
                </Table>
              </li>
            ))}
          </ol>
        )}
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
