import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './models/Appointment.js';
import User from './models/User.js';
import Stylist from './models/Stylist.js';
import Service from './models/Service.js';
import Branch from './models/Branch.js';

dotenv.config();

const numAppointments = 150;

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'SalonDesk'
        });
        console.log('Connected to MongoDB (SalonDesk)');

        // Delete old foreign data to wipe slate clean
        await Appointment.deleteMany({});
        await Stylist.deleteMany({});
        await Service.deleteMany({});
        await Branch.deleteMany({});

        console.log('Creating Indian branches...');
        const branches = await Branch.insertMany([
            { name: 'Éclat Mumbai', address: 'Bandra West, Mumbai', contact: '022-5555-0100', manager: 'Sanjay Mehta' },
            { name: 'Éclat Delhi', address: 'Connaught Place, Delhi', contact: '011-5555-0101', manager: 'Anjali Desai' }
        ]);

        console.log('Creating Indian stylists...');
        const stylists = await Stylist.insertMany([
            { name: 'Aarav Patel', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', email: 'aarav@eclat.com', phone: '9876543210', gender: 'male', branch: branches[0]._id, specialty: 'Coloring', rating: 4.8 },
            { name: 'Neha Gupta', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', email: 'neha@eclat.com', phone: '9876543211', gender: 'female', branch: branches[1]._id, specialty: 'Haircuts', rating: 4.9 },
            { name: 'Vikram Singh', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', email: 'vikram@eclat.com', phone: '9876543212', gender: 'male', branch: branches[0]._id, specialty: 'Extensions', rating: 4.7 },
            { name: 'Priya Sharma', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', email: 'priya@eclat.com', phone: '9876543213', gender: 'female', branch: branches[1]._id, specialty: 'Bridal Makeup', rating: 5.0 },
            { name: 'Rahul Verma', imageUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', email: 'rahul@eclat.com', phone: '9876543214', gender: 'male', branch: branches[0]._id, specialty: 'Gentleman Grooming', rating: 4.6 }
        ]);

        console.log('Creating services...');
        const services = await Service.insertMany([
            { name: 'Signature Cut', description: 'Precision cutting for your exact face shape.', price: 1500, duration: 60, category: 'unisex', branch: branches[0]._id },
            { name: 'Balayage & Tone', description: 'Hand-painted highlights for a natural look.', price: 6500, duration: 180, category: 'female', branch: branches[0]._id },
            { name: 'Gentleman Grooming', description: 'Classic cut and hot towel shave.', price: 1200, duration: 45, category: 'male', branch: branches[1]._id },
            { name: 'Bridal Glow Facial', description: 'Radiant skin treatment for the big day.', price: 4500, duration: 90, category: 'female', branch: branches[1]._id },
            { name: 'Keratin Treatment', description: 'Frizz-free smoothing treatment.', price: 8000, duration: 150, category: 'unisex', branch: branches[0]._id }
        ]);

        const users = await User.find({ role: 'client' });
        const appointments = [];
        const now = new Date();

        const indianGuestNames = ['Rohan', 'Aditi', 'Karan', 'Sneha', 'Arjun', 'Pooja', 'Vivek', 'Riya', 'Amit', 'Kavita'];

        for (let i = 0; i < numAppointments; i++) {
            const branch = branches[Math.floor(Math.random() * branches.length)];
            const service = services[Math.floor(Math.random() * services.length)];
            const stylist = stylists[Math.floor(Math.random() * stylists.length)];

            // Random date within the last 5 months
            const pastDate = new Date();
            pastDate.setDate(now.getDate() - Math.floor(Math.random() * 150));

            let clientObj = {};
            if (users.length > 0 && Math.random() > 0.4) {
                clientObj.client = users[Math.floor(Math.random() * users.length)]._id;
            } else {
                const guest = indianGuestNames[Math.floor(Math.random() * indianGuestNames.length)];
                clientObj.guestName = `${guest} ${Math.floor(Math.random() * 100)}`;
            }

            appointments.push({
                ...clientObj,
                branch: branch._id,
                service: service._id,
                stylist: stylist._id,
                date: pastDate,
                time: "14:00",
                status: 'completed'
            });
        }

        await Appointment.insertMany(appointments);
        console.log(`Successfully seeded ${appointments.length} appointments.`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();
