import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import Stylist from '../models/Stylist.js';
import Branch from '../models/Branch.js';

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
  } catch (error) {
    console.error('❌ Error initializing collections:', error.message);
  }
};
