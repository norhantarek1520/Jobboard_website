const asyncHandler = require('express-async-handler');
const {getUserId } = require('../Shared/SharedFunctions')
const ApiError = require('../Shared/ApiError');
const { User } = require('../Models/User');

 exports.isAuthorized = asyncHandler(async (req, res, next) => {
    // 1) Check if token exist, if exist get
    let authToken;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
      authToken = req.headers.authorization.split(' ')[1]; 
    }
    if (!authToken) {
      return next( new ApiError('You are not login, Please login to get access this route',401) );
    }
  
    // 2) Verify token (no change happens, expired token)
  
    // 3) Check if user exists
    const userId = getUserId(authToken) ;
    const user = await User.getById(userId.userId) ;
    if (!user) {
      return res.status(401).json({ message: 'User not found with the provided token ,  You are not authorized' });
    }
    next();

    // 4) Check if user change his password after token created
  
    
   
  });
  