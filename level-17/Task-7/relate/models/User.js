const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    domain: {
      type: String,
      required: [true, "Domain is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Post-save hook
userSchema.post("save", function (doc) {
  console.log(`New user created: ${doc.username}`);
});

// Pre-find hook to exclude inactive users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance Method
userSchema.methods.getProfile = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    domain: this.domain,
  };
};

// Static Method
userSchema.statics.findByDomain = function (domain) {
  return this.find({ domain });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
