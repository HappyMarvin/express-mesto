const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.getUserById = (req, res) => {
  const userId = req.params.id
  User.findOne({ _id: userId })
    .then(user => res.send(user))
    .catch(err => {
      console.log(err);
      res.status(500).send({message: err.message})
    });
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      console.log(res.status);
      res.status(500).send({message: err.message})}
    );
}