const models = require('../models'); // loads index.js
const User = models.user; 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
 //console.log(req.body);
  const {firstName,lastName, email, password } = req.body;
  try{
    const user = await User.create({ 
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: 'user',
    });
  
    if (!user) {
      res.status(400).json({success:false, message: 'Registration failed' });
      return;
    }

    res.status(201).json({ success:true, message: 'User registered successfully' });
  }catch(errors){
        res.status(400).json({ success:false, message: 'Registration failed', errors:errors });
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({where: { email } });
 
  if (!user) {
    res.status(400).json({success:false, message: 'Invalid email or password' });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({ success:false, message: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '89h',
  });

  res.status(200).json({
     success:true,
      token ,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
    });
};