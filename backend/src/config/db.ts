import mongoose from 'mongoose';
import env from './env';

async function connectDB() {
    try {
        await mongoose.connect(env.DB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;