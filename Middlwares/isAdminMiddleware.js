const { User } = require("../Models/User");
const asyncHandler = require('express-async-handler');
const { getUserId } = require('../Shared/SharedFunctions');
const ApiError = require("../Shared/ApiError");

exports.isAdmin = asyncHandler(async (req, res, next) => {
   // 1) Check if token exist, if exist get
   let authToken;
   if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
    authToken = req.headers.authorization.split(' ')[1]; 
   }
   if (!authToken) {
     return next( new ApiError('You are not login, Please login to get access this route',401) );
   }

  try {
    const userId = getUserId(authToken)
    const user = await User.getById(userId.userId)
    if (!user) {
      return res.status(401).json({ message: 'User not found with the provided token' });
    }

    if (user.role === 'Admin') return next();

    return res.status(401).json({ message: 'Only authorized users (Admins) can complete this action. You are not authorized.' });
  } catch (err) {
    console.error(err);

    // Consider creating custom error classes for specific errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      // return res.status(500).json({ message: 'Internal Server Error' });
      return next(new ApiError(`Internal Server Error ,The Error is : ${err}`, 500))
    }
  }
});
