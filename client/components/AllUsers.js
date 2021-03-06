import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers, fetchUpdatedUser} from '../store/allUsers'
import {Table, Button} from 'react-bootstrap'

class AllUsers extends React.Component {
  async componentDidMount() {
    await this.props.getAllUsers()
  }

  async handleUpdateUser(user) {
    await this.props.updateUserType(user)
  }

  render() {
    const users = this.props.users || []

    return (
      <div className="allUsersContainer">
        <Table striped bordered hover size="small">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Toggle User Type</th>
              <th>Order History</th>
            </tr>
            {users && users.length ? (
              users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                    <td>
                      <Button
                        id="cartButton"
                        variant="dark"
                        className="removeProductButton"
                        onClick={() => this.handleUpdateUser(user)}
                      >
                        Toggle Type
                      </Button>
                    </td>
                    <td>
                      <Button
                        id="cartButton"
                        variant="dark"
                        className="removeProductButton"
                        href={`/history/${user.id}`}
                      >
                        View Order History
                      </Button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <div>No users available</div>
            )}
          </thead>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(fetchAllUsers()),
  updateUserType: user => dispatch(fetchUpdatedUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
