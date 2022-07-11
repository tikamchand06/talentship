const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Authentication status
const STATUS_ACTIVE = 1;
const STATUS_INACTIVE = 0;

// Gender types
const GENDER_MALE = 1;
const GENDER_FEMALE = 0;
const GENDER_UNKNOWN = -1;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email address is not valid",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      displayPic: { type: String },
      dob: { type: Date },
      gender: {
        type: Number,
        default: GENDER_UNKNOWN,
      },
    },
    status: {
      type: Number,
      default: STATUS_ACTIVE,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("User", UserSchema);
