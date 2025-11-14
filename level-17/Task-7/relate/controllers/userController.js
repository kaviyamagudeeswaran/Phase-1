const User = require("../models/User");

// Create User
const registerUser = async (req, res) => {
  const { username, email, password, domain } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    domain,
  });

  await user.save();

  res.status(201).json({
    message: "User Registered Successfully",
    profile: user.getProfile(),
  });
};
