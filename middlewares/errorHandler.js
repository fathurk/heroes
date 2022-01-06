const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: err[0].message });
      break;
    case "JsonWebTokenError":
    case "Invalid Token":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "Hero not found":
      res.status(400).json({ message: "Hero not found" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "You are not authorized " });
      break;
    case "Unauthenticated":
      res.status(400).json({ message: "Invalid email/password" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
