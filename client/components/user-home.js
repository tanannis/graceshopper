import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

  return (
    <div className="homePage">
      <div className="cupcakeBackground" />
      <div>{firstName && <h4>Muffin compares to you, {firstName}!</h4>}</div>

      <div className="homeCenter">
        <div className="homePageContent">
          <h1 className="homeTitle">Grace Bakes</h1>
        </div>
        <div className="homePageContent">
          <h3>Some only dream of cake, we bake it happen!</h3>
        </div>
      </div>

      <div className="homePageContent">
        <img
          id="homePageImg"
          //README: replace with a logo or another fun image?
          // src="https://cdn.pixabay.com/photo/2017/04/22/00/53/cupcakes-2250367_960_720.jpg"
        />
      </div>
      <div className="homePageContent copyright">
        Icons made by&nbsp;
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik&nbsp;
        </a>
        &nbsp;from&nbsp;
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
