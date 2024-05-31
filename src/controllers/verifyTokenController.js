const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const verifyTokenController = (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token has expired' , status:401 });
        } else {
          return res.status(401).json({ error: 'Invalid token' , status:401 });
        }
      }

      res.status(200).json({ message: 'Token is valid', decoded ,status:200});
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { verifyTokenController };
