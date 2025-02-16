const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError') 
const { User } = require('../Models/User')
const {getUserId} = require('../Shared/SharedFunctions')
class UserController {

  static getAllUsers = asyncHandler(async (req, res,next) => {
    try {
      const users = await User.getAll();
      res.json(users)
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
   
  })
  static getOneUser = asyncHandler(async (req, res,next) => {
   
    let  authToken = req.headers.authorization.split(' ')[1]; 
    try {
      const userId = getUserId(authToken)
      const user = await User.getById(userId.userId);
      if (!user) {
        return next(new ApiError('User not found', 404));
       
      }
      return res.json({user: user}); // Return user data as JSON
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  })
  static  updateUser = asyncHandler(async (req, res,next) => {
   
    let  authToken = req.headers.authorization.split(' ')[1]; 
    const user_data = req.body; 
  
    try {
      const userId = getUserId(authToken)
      const userobj = {    
        gender: user_data.gender || 'male',
        name: user_data.name,
        address: user_data.address,
        education: user_data.education,
        job_title: user_data.job_title,
        image: user_data.image,
        age: user_data.age,
        phone_number: user_data.phone_number,
        id : userId.userId}
      const updated = await User.update(userobj);
    
      if (updated) {
        return res.json({ message: 'User updated successfully' });
      } else {
        return next(new ApiError('Failed to update user', 400));
       
      }
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500)); 
    }
  });
  static deleteUser = asyncHandler(async (req, res,next) => {
    const userId = req.params.id; // Assuming user ID is in the URL parameter
    try {
      const deleted = await User.delete(userId);
      if (!deleted) {
        return next(new ApiError('User not found', 404));
        
      }
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
       }
  })

}
module.exports = { UserController }