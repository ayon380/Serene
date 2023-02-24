const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const todo = require("../models/Todo");
const { body, validationResult } = require("express-validator");

router.get("/fetchalltodo", fetchuser, async (req, res) => {
  try {
    const todos = await todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.post(
  "/addtodo",
  fetchuser,
  [
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const {  description } = req.body;
      console.log(description);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const todo = new todo({
        description,
        user: req.user.id,
      });
      const savedtodo = await todo.save();

      res.json(savedtodo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put("/updatetodo/:id", fetchuser, async (req, res) => {
  const {  description } = req.body;
  const newtodo = {};
  if (description) {
    newtodo.description = description;
  }
  let todo = await todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).send("Not Found");
  }
  if (todo.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  todo = await todo.findByIdAndUpdate(
    req.params.id,
    { $set: newtodo },
    { new: true }
  );
  res.json({ todo });
});

router.delete("/deletetodo/:id", fetchuser, async (req, res) => {
  try {
    let todo = await todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not Found");
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    todo = await todo.findByIdAndDelete(req.params.id);
    res.json({ Success: "todo has been deleted successfully", todo: todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
