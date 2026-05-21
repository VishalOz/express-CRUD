import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import logger from '../utils/logger.js';

class UserService {
  // Hash password utility
  static async hashPassword(password) {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || 10);
    return await bcrypt.hash(password, saltRounds);
  }

  // Create user with hashed password
  static async createUser(userData) {
    try {
      // Business logic: Hash password before creating
      if (userData.password) {
        userData.password = await this.hashPassword(userData.password);
      }
      
      const user = await User.create(userData);
      logger.info(`User created: ${user.email}`);
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user password
  static async updatePassword(userId, newPassword) {
    try {
      const hashedPassword = await this.hashPassword(newPassword);
      const user = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      
      if (!user) {
        throw new Error('User not found');
      }
      
      logger.info(`Password updated for user: ${user.email}`);
      return user;
    } catch (error) {
      logger.error('Error updating password:', error);
      throw error;
    }
  }

  // Get user by email (with password for authentication)
  static async getUserByEmailWithPassword(email) {
    return await User.findOne({ email }).select('+password');
  }

  // Get user by id
  static async getUserById(userId) {
    return await User.findById(userId);
  }

  // Get all users
  static async getAllUsers() {
    return await User.find().select('-password');
  }

  // Update user
  static async updateUser(userId, updateData) {
    // Don't allow password update through this method
    delete updateData.password;
    
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new Error('User not found');
    }
    
    logger.info(`User updated: ${user.email}`);
    return user;
  }

  // Delete user
  static async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    logger.info(`User deleted: ${user.email}`);
    return user;
  }
}

export default UserService;