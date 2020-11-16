import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AllProducts, OrderHistory} from './components'
import {me} from './store'
import singleProduct from './components/singleProduct'
import NewProductForm from './components/NewProductForm'
import Cart from './components/Cart'
import CheckoutPage from './components/CheckoutPage'
import AllUsers from './components/AllUsers'
import Confirmation from './components/Confirmation'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={singleProduct} />
        {isAdmin ? (
          <Route exact path="/addproduct" component={NewProductForm} />
        ) : (
          ''
        )}
        {isAdmin ? <Route exact path="/users" component={AllUsers} /> : ''}
        {isLoggedIn ? (
          <Route exact path="/history/:userId" component={OrderHistory} />
        ) : (
          ''
        )}
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/order-confirmation" component={Confirmation} />
        <Route path="/home" component={UserHome} />
        <Route component={UserHome} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.userType === 'admin'
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
