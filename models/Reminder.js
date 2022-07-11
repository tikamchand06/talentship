const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Authentication status
const STATUS_DRAFT = 0;
const STATUS_SENT = 1;
const STATUS_DELETED = 2;

const ReminderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sendTime: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Number,
      default: STATUS_DRAFT,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = Reminder = mongoose.model("Reminder", ReminderSchema);
