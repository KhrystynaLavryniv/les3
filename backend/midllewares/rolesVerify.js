module.exports = (rolesArr) => {
  return (req, res, next) => {
    try {
      console.log(req.user.roles);
      const userRoles = req.user.roles;
      let hasRole = false;
      if (userRoles) {
        userRoles.forEach((role) => {
          if (rolesArr.includes(role)) {
            hasRole = true;
          }
        });
      }
      if (!hasRole) {
        return res.status(403).json({
          message: "Немає прав доступу",
        });
      }
      next();
    } catch (error) {
      res.status(403);
      throw new Error("Не авторизований, немає прав доступу");
    }
  };
};
