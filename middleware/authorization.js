permit = (...permittedRoles) => {
  
  return (request, response, next) => {
    const { user } = request;

    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      response.status(403).json({message: "permission refusée"}); // user is forbidden
    }
  }
};

module.exports = permit;