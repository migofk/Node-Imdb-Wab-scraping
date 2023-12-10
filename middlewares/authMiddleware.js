var models = require('../models'); // loads index.js
var User = models.user; 
const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
    try {
    const token = req.headers.authorization.split(' ')[1];
console.log(token);
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findByPk(decoded.id);
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' , error});
    }

}