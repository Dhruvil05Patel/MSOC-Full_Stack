import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function checkAdmin() {
    await mongoose.connect(process.env.MONGODB_URI);
    const owner = await User.findOne({ role: 'owner' });
    if (owner) {
        console.log('Owner email found:', owner.email);
    } else {
        console.log('No owner found in the DB. Generating one...');
    }
    mongoose.disconnect();
}
checkAdmin();
