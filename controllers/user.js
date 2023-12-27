const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const username = await User.findOne({ username: req.body.username });
    if (username) {
      return res
        .status(400)
        .send({ error: "A user has already registered with this username" });
    }
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getLoggedInUserProfile = async (req, res) => {
  res.send(req.user);
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutUserFromAllDevices = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getLoggedInUserProfile,
  logoutUser,
  logoutUserFromAllDevices,
};
