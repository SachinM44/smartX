const { User } = require('../DB/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const { registerSchema } = require('../middleware/zodSchemas'); 
dotenv.config();
// / new register 
exports.register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { name, email, phone, password } = validatedData    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    user = new User({
      name,
    email,
      phone,
        password: hashedPassword
    });

    await user.save();
    const payload = {
      user: {
         id: user.id
      }
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
         res.status(201).json({ token });
      }
    );
  } catch (err) {
    if (err.errors) {
        return res.status(400).json({
        errors: err.errors.map(e => ({
           msg: e.message,
           path: e.path.join('.')
        }))
        });
    }
      console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
       if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    // generate JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};