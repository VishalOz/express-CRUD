import UserService from './user.service.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

class AuthService {
  // Register new user
  static async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await UserService.getUserByEmailWithPassword(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create user (password hashing handled in UserService)
      const user = await UserService.createUser(userData);
      
      // Generate token
      const token = this.generateToken(user._id, user.email);
      
      return { user, token };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  static async login(email, password) {
    try {
      // Get user with password field
      const user = await UserService.getUserByEmailWithPassword(email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate token
      const token = this.generateToken(user._id, user.email);
      
      // Remove password from response
      const userWithoutPassword = user.toJSON();
      
      logger.info(`User logged in: ${email}`);
      return { user: userWithoutPassword, token };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  // Generate JWT token
  static generateToken(userId, email) {
    return jwt.sign(
      { userId, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  // Verify token
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Change password
  static async changePassword(userId, oldPassword, newPassword) {
    // Get user with password
    const user = await UserService.getUserByEmailWithPassword(
      (await UserService.getUserById(userId)).email
    );
    
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    await UserService.updatePassword(userId, newPassword);
    
    logger.info(`Password changed for user: ${user.email}`);
    return { message: 'Password updated successfully' };
  }
}

export default AuthService;