const userService = require("../services/userService");

const newUserControllerForDemo = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json({ data: users, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

module.exports = { newUserControllerForDemo };
