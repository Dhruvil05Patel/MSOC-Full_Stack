import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import Stylist from '../models/Stylist.js';
import Branch from '../models/Branch.js';
import bcrypt from 'bcryptjs';

// This function touches the collections so MongoDB creates them
export const initializeCollections = async () => {
  try {
    await Promise.all([
      User.init(),
      Appointment.init(),
      Service.init(),
      Stylist.init(),
      Branch.init()
    ]);

    console.log('✅ All collections initialized.');
    
    // Create a test user if none exists
    await createTestUser();
  } catch (error) {
    console.error('❌ Error initializing collections:', error.message);
  }
};

// Create a test user for debugging
const createTestUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const testUser = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        phone: '1234567890',
        role: 'client'
      });
      await testUser.save();
      console.log('✅ Test user created: test@example.com / password123');
    } else {
      console.log('ℹ️ Test user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
  }
};
