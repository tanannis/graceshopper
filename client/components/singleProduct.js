import React from 'react'
import {connect} from 'react-redux'

class SingleCampus extends React.Component {
  componentDidMount() {
    this.props.getSingleCampus(this.props.match.params.id)
  }

  render() {
    const campus = this.props.campus.info
    const students = this.props.campus.info.students
    const {unregisterStudent} = this.props

    return (
      <div>
        <h1>{campus.name}</h1>
        <img src={campus.imageUrl} />
        <p>Address: {campus.address}</p>
        <p>Description: {campus.description}</p>
        <p>
          Students:
          {students.length > 0 ? (
            students.map(student => {
              return (
                <li key={student.id}>
                  {student.firstName} {student.lastName}
                  &nbsp;
                  <button onClick={() => unregisterStudent(student.id)}>
                    Unregister
                  </button>
                </li>
              )
            })
          ) : (
            <li> This campus has no student yet. </li>
          )}
        </p>
        <div>
          <h3>Update Campus Info:</h3>
          <UpdateCampusForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    campus: state.singleCampus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleCampus: id => dispatch(fetchSingleCampus(id)),
    unregisterStudent: id => dispatch(fetchUnlinked(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
