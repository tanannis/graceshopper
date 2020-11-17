// does this function take in an array?
// add a comment or two for documentation around inputs for this function
function permit() {
  // return a middleware
  return (request, response, next) => {
    const {user} = request
    if (user && user.userType === 'admin') {
      next()
    } else {
      response.status(403).json({message: 'Forbidden'})
    }
  }
}

module.exports = permit
