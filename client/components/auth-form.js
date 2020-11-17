import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Form, Button} from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Form onSubmit={handleSubmit} name={name} className="authForm">
        <Form.Group>
          <Form.Label htmlFor="email">
            <small>Email</small>
          </Form.Label>
          <Form.Control name="email" type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">
            <small>Password</small>
          </Form.Label>
          <Form.Control name="password" type="password" />
        </Form.Group>
        <div className="authButtonBox">
          <Button id="authButton" variant="dark" type="submit">
            {displayName}
          </Button>
          <div>OR</div>
          <Button id="googleButton" href="/auth/google">
            {/* <span className="icon"></span>
            <span className="buttonText">Google</span> */}
            {/* {displayName} with Google</Button> */}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
