const {User} = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const {createToken, createHashPassword } = require('../Shared/SharedFunctions');


class AuthController {

  static register = asyncHandler(async (req, res, next) => {
    // 1. Get user data from request body
    const { name, email, password } = req.body;
  
    // 2. Validate email and password (optional)
    if (!email || !password || !name) {
      return next(new ApiError('Please provide name, email and password', 400));
    }
  
    // 3. Check if email already exists
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return next(new ApiError('Email already exists', 400));
    }
  
    // 4. Hash password
    const hashedPassword = await createHashPassword(password);
  
    // 5. Create new user
    const user = new User(null, null, null, name, email, hashedPassword);
    const createdUser = await User.create(user.name, user.email, user.password);
  
    if (!createdUser) {
      return next(new ApiError('Failed to create user', 500));
    }

    const userId =await User.getIdByEmail(email)
    // 2- Generate token
    if (process.env.JWT_KEY != null && process.env.JWT_EXPIRE_TIME != null) {
      //const token =  jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_TIME,});
      const token = createToken(userId)
      if (token != null) {
        // delete user._doc.password;
        res.status(201).json({ token });
      }
      else {
        res.status(500).json("Yourdata is added to databases but we have poblem , please try to login ")
      }
    }
    else {
      return next(new ApiError('JWT configuration missing. Please set JWT_KEY and JWT_EXPIRE_TIME environment variables.', 500));
    }
    // 6. (Optional) Send welcome email
  

  }); 
  static login = asyncHandler(async (req, res, next) => {
    // 1. Get email and password from request body
    const { email, password } = req.body;
  
    // 2. Validate email and password (optional)
    if (!email || !password) {
      return next(new ApiError('Please provide email and password', 400));
    }
  
    // 3. Find user by email
    const user = await User.getByEmail(email);
    if (!user) {
      return next(new ApiError('Invalid email or password', 401));
    }
  
    // 4. Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError('Invalid email or password', 401));
    }
  
    // 5. Generate JWT token
    const token = createToken({ userId: user.id });
    if (!token) {
      return next(new ApiError('Failed to generate token', 500));
    }
  
    // 6. Send response with user data and token
    res.status(200).json({ token });
  });
  static logout = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      jwt.verify(token, process.env.JWT_KEY);
      // **Optional Blacklist Logic Here (if implemented):**
      // blacklist.add(token);
  
      res.status(200).json({ message: 'Logged out successfully' }); // Informative message
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' }); // Handle invalid tokens
    }
  });

}
module.exports = { AuthController }



