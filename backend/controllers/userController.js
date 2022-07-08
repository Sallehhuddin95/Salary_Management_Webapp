const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");

// @ desc get goals
// @ route Get /api/goals
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @ desc set goals
// @ route Post /api/goals
const setUsers = asyncHandler(async (req, res) => {
  if (!req.body.userID) {
    throw new Error("Please add a user id field");
  }
  if (!req.body.login) {
    throw new Error("Please add a user login field");
  }
  if (!req.body.name) {
    throw new Error("Please add a user name field");
  }
  if (!req.body.salary) {
    throw new Error("Please add a user salary field");
  }

  const user = await User.create({
    login: req.body.login,
    name: req.body.name,
    salary: req.body.salary,
    userID: req.body.userID,
  });

  res.status(200).json(user);
});

// @ desc update goals
// @ route Put /api/goals/:id
const updateUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //Check for user
  if (!req.id) {
    res.status(401);
    throw new Error("User not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @ desc Delete goals
// @ route Delete /api/goal/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Goal.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getUsers,
  setUsers,
  updateUsers,
  deleteUser,
};
