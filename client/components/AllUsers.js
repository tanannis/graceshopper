import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'
import {Table} from 'react-bootstrap'

class AllUsers extends React.Component {
  async componentDidMount() {
    await this.props.getAllUsers()
  }

  render() {
    const users = this.props.users || []

    return (
      <div className="usersBody">
        <div className="allUsersContainer">
          {users && users.length ? (
            users.map(user => {
              return (
                <div className="userBox" key={user.id}>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              )
            })
          ) : (
            <div>No users available</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
