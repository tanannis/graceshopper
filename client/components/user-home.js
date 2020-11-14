import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllUsers from './AllUsers'
import AllProducts from './AllProducts'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, isAdmin} = props

  return (
    <div className="homePage">
      <div>{firstName && <h4>Welcome back, {firstName}!</h4>}</div>
      <div className="homePageContent">
        <h1>GRACE BAKES</h1>
      </div>
      <div className="homePageContent">
        <h3>Some only dream of cake, we bake it happen!</h3>
      </div>
      <div className="homePageContent">
        <img
          id="homePageImg"
          src="https://cdn.pixabay.com/photo/2017/04/22/00/53/cupcakes-2250367_960_720.jpg"
        />
      </div>
      <div className="homePageContent">
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    email: state.user.email,
    isAdmin: state.user.userType === 'admin'
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
