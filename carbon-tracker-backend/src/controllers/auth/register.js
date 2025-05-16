const User = require("../../models/user");

const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });

    const { error } = bodySchema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { name, username, email, password } = req.body;

    const newUser = new User({
        name,
        username,
        email,
        password,
        activities: []
    })

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
