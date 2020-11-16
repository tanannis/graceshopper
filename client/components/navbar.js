import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import BabyCart from './BabyCart'
import {Nav, Navbar} from 'react-bootstrap'

const NavbarComponent = ({handleClick, isLoggedIn, isAdmin, userId}) => (
  <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>GRACE BAKES</Navbar.Brand>
      <Nav>
        <Nav.Link as={NavLink} to="/home">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/products">
          All Goodies
        </Nav.Link>
        {isAdmin ? (
          <Nav.Link as={NavLink} to="/addproduct">
            Add Product
          </Nav.Link>
        ) : (
          ''
        )}
        {isAdmin ? (
          <Nav.Link as={NavLink} to="/users">
            All Users
          </Nav.Link>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <>
            <Nav.Link href="#" onClick={handleClick}>
              Logout
            </Nav.Link>
            <Nav.Link as={NavLink} to={`/history/${userId}`}>
              Order History
            </Nav.Link>
          </>
        ) : (
          <>
            {' '}
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signup">
              Sign Up
            </Nav.Link>{' '}
          </>
        )}
      </Nav>
      <Nav className="cart-nav-item">
        <BabyCart />
      </Nav>
    </Navbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.userType === 'admin',
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarComponent)

/**
 * PROP TYPES
 */
NavbarComponent.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
