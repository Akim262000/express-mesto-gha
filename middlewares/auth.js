const jwt = require("jsonwebtoken");
const ErrorUnauthorized = require("../errors/ErrorUnauthorized");

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return new ErrorUnauthorized("Необходима авторизация");
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token);
  } catch (err) {
    return new ErrorUnauthorized("Необходима авторизация");
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
