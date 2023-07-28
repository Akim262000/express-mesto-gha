const jwt = require("jsonwebtoken");
const ErrorUnauthorized = require("../errors/ErrorUnauthorized");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new ErrorUnauthorized("Необходима 1авторизация");
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new ErrorUnauthorized("Необходима 2авторизация");
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};