import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default class Loader extends React.Component {
  render() {
    return (
      <div className="spinner">
        <Spinner animation="border" role="status" variant="secondary" />
      </div>
    )
  }
}
