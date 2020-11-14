import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'

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
                  <h2 className="userName">
                    <a href={`/users/${user.id}`}>{user.name}</a>
                  </h2>
                  <a href={`/users/${user.id}`} />
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
