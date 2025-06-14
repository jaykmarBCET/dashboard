import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL as string;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URL environment variable is not set');
}

let isConnected = false;

export async function dbConnect(): Promise<void> {
  if (isConnected) return;

  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      dbName: 'dashboard',
    });

    isConnected = true;

    console.log(`MongoDB connected at ${connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    
  }
}
