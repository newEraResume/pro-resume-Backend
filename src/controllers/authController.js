const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const generateJwtSecret = () => {
    return crypto.randomBytes(64).toString('hex');
  };

  const signupController = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        
      if (!email) {
        return res.status(400).json({ error: 'Email address is required' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email address is already in use' });
      }

      const newUser = new User({ email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error in signupController:', error); // Log the actual error
      res.status(500).json({ error: 'Something went wrong' });
    }
  };


  const loginController = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: 'Email address and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'No user found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user._id }, generateJwtSecret(), { expiresIn: '1h' });
      res.status(200).json({ token:token , message:"Login Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong',error });
    }
  };

module.exports = {signupController , loginController};
