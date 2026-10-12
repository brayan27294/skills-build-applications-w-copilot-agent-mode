import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';
import { connectDatabase } from '../config/database.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
        fitnessLevel: 'advanced',
        age: 29,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@example.com',
        fitnessLevel: 'intermediate',
        age: 31,
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        fitnessLevel: 'advanced',
        age: 27,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'Road race and endurance crew',
        members: [users[0]._id, users[1]._id],
        focus: 'endurance',
      },
      {
        name: 'Peak Pioneers',
        description: 'Strength and mobility group',
        members: [users[2]._id],
        focus: 'strength',
      },
    ]);

    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        calories: 420,
        date: new Date('2026-10-10T06:30:00.000Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        calories: 310,
        date: new Date('2026-10-11T18:00:00.000Z'),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 40,
        calories: 350,
        date: new Date('2026-10-12T07:15:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        rank: 1,
        user: users[0]._id,
        displayName: 'Ava Thompson',
        points: 1280,
        lastUpdated: new Date('2026-10-12T08:00:00.000Z'),
      },
      {
        rank: 2,
        user: users[1]._id,
        displayName: 'Marcus Lee',
        points: 1140,
        lastUpdated: new Date('2026-10-12T08:00:00.000Z'),
      },
      {
        rank: 3,
        user: users[2]._id,
        displayName: 'Priya Shah',
        points: 980,
        lastUpdated: new Date('2026-10-12T08:00:00.000Z'),
      },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Circuit',
        focus: 'Cardio',
        durationMinutes: 25,
        difficulty: 'advanced',
        exercises: ['Burpees', 'Jump squats', 'Mountain climbers'],
      },
      {
        title: 'Core Stability',
        focus: 'Strength',
        durationMinutes: 30,
        difficulty: 'intermediate',
        exercises: ['Planks', 'Dead bugs', 'Russian twists'],
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, and 2 workouts.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
