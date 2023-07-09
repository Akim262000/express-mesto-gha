const users = require('../models/user');

function getUsers(req, res) {
  res.send(users);
}

function getUser(req, res) {
  const { id } = req.params;
  const user = users.find(user => user._id === userId);
  res.send(user);
}

function createUser(req, res) {
  console.log('User create:');
  console.log(req.body);
  res.status(201).send(req.body);
}

function toRenovateUser(req, res) {

}

function toRenovateUserAvatar(req, res) {

}

module.exports = {
  getUsers,
  getUser,
  createUser,
  toRenovateUser,
  toRenovateUserAvatar
};