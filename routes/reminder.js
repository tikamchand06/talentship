const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Reminder = require("../models/Reminder");

// @route   GET api/reminders
// @desc    Get all Reminders
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    let reminders = await Reminder.find({ user: req.user.id });

    res.json(reminders);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/reminders
// @desc    Create an reminder
// @access  Public
router.post("/", auth, async (req, res) => {
  const { title, message, sendTime, status } = req.body;

  try {
    let reminder = new Reminder({ title, message, sendTime, status, user: req.user.id });
    await reminder.save();

    res.json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route   PUT api/reminders
// @desc    Update an reminder
// @access  Public
router.put("/:id", auth, async (req, res) => {
  const { title, message, sendTime, status } = req.body;

  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) return res.status(400).send("No reminder found.");

    reminder.title = title;
    reminder.message = message;
    reminder.sendTime = sendTime;
    reminder.status = status;

    await reminder.save();

    res.json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route   delete api/reminders
// @desc    delete an reminder
// @access  Public
router.delete("/:id", auth, async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) return res.status(400).send("No reminder found.");

    const deleted = await Reminder.findByIdAndDelete(req.params.id);

    res.json(deleted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
