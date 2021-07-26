const {request, response} = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.authUser) {
    return res.status(500).json({
      message: 'Verify role without validate token first',
    });
  };

  const {role, name} = req.authUser;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      message: `The user ${name} is not an admin`,
    });
  };

  next();

};

const hasRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.authUser) {
      return res.status(500).json({
        message: 'Verify role without validate token first',
      });
    };

    if (!roles.includes(req.authUser.role)) {
      if (!req.authUser) {
        return res.status(401).json({
          message: 'Invalid user role',
        });
      };
    }

    next();
  }
};

module.exports = {
  isAdminRole,
  hasRoles,
}