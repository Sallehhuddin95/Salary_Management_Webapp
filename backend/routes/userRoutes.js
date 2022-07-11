const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUsers,
  updateUsers,
  deleteUser,
} = require("../controllers/userController");

// const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getUsers).post(setUsers);
router.route("/:id").delete(deleteUser).put(updateUsers);

module.exports = router;
