import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';
import User from '../src/models/User.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB\n');

    console.log('=== Create Admin Account ===\n');

    const username = await question('Enter username (e.g., admin): ');
    const email = await question('Enter email: ');
    const password = await question('Enter password: ');

    if (!username || !email || !password) {
      console.log('\n❌ All fields are required!');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('\n❌ User with this email or username already exists!');
      process.exit(1);
    }

    // Create admin user
    const user = new User({
      username,
      email,
      password,
      role: 'admin'
    });

    await user.save();

    console.log('\n✅ Admin account created successfully!');
    console.log('\n📋 Your credentials:');
    console.log(`   Username: ${username}`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n🔐 You can now login at: http://localhost:5173/admin/login');
    console.log('\n⚠️  Save these credentials in a safe place!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
