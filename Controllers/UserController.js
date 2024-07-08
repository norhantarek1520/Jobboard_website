const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError') 
const { User } = require('../Models/User')
//  return next(new ApiError('JWT configuration missing. Please set JWT_KEY and JWT_EXPIRE_TIME environment variables.', 500));

class UserController {

  static getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.getAll();
    res.json(users)
  })
  static getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id; // Assuming user ID is in the URL parameter
    try {
      const user = await User.getById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user); // Return user data as JSON
    } catch (error) {
      console.error('Error getting user:', error);
      return res.status(500).json({ message: 'Internal server error' }); // Handle errors generically
    }
  })

  static  updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id; // Assuming user ID is in the URL parameter
    const updateData = req.body; // Assuming user data is sent in the request body
  
    try {
      const user = new User(updateData); // Create a User object from request body (validation can be added here)
  
      const updated = await User.update({
        gender: user.gender === undefined ? null : user.gender,
        role: user.role,
        name: user.name,
        email: user.email,
        password: user.password, // Consider hashing password before update
        address: user.address,
        education: user.education,
        jobTitle: user.jobTitle,
        image: user.image,
        age: user.age,
        phoneNumber: user.phoneNumber,
      }, userId);
  
      if (updated) {
        return res.json({ message: 'User updated successfully' });
      } else {
        return res.status(400).json({ message: 'Failed to update user' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Internal server error' }); // Generic error for unexpected issues
    }
  });
  
  
  static deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id; // Assuming user ID is in the URL parameter
    try {
      const deleted = await User.delete(userId);
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Internal server error' }); // Handle errors generically
    }
  })
}
module.exports = { UserController }