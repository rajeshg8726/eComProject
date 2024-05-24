// controllers/AuthController.js

const jwt = require('jsonwebtoken');
const secret = "rajeshgupta@8726"
const generateAuthToken = (user) => {
  const token = jwt.sign({ userId: user._id, email: user.email }, secret);
  return token;
};

const getUser = (token) => {
  if(!token)return null;
return jwt.verify(token , secret);

}


module.exports = {
  generateAuthToken,
  getUser,
};
