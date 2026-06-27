import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

// Seed the octofit_db database with test data
async function seedDatabase() {
  const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      fitnessGoal: 'Improve endurance',
      experienceLevel: 'Intermediate',
    },
    {
      name: 'Theo Alvarez',
      email: 'theo.alvarez@example.com',
      fitnessGoal: 'Build strength',
      experienceLevel: 'Advanced',
    },
    {
      name: 'Lina Brooks',
      email: 'lina.brooks@example.com',
      fitnessGoal: 'Stay consistent',
      experienceLevel: 'Beginner',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Momentum Squad',
      sport: 'Cross-training',
      members: users.slice(0, 2).map((user) => user._id.toString()),
      focus: 'Weekly challenge',
    },
    {
      name: 'Peak Pace',
      sport: 'Running',
      members: [users[2]._id.toString()],
      focus: 'Speed intervals',
    },
  ]);

  const activities = await Activity.insertMany([
    {
      type: 'Run',
      durationMinutes: 32,
      calories: 320,
      userId: users[0]._id.toString(),
      date: new Date('2026-06-20T07:00:00.000Z'),
    },
    {
      type: 'Strength',
      durationMinutes: 45,
      calories: 240,
      userId: users[1]._id.toString(),
      date: new Date('2026-06-21T18:30:00.000Z'),
    },
    {
      type: 'Cycling',
      durationMinutes: 60,
      calories: 410,
      userId: users[2]._id.toString(),
      date: new Date('2026-06-22T06:15:00.000Z'),
    },
  ]);

  await Leaderboard.insertMany([
    { userId: users[0]._id.toString(), points: 980, rank: 1 },
    { userId: users[1]._id.toString(), points: 912, rank: 2 },
    { userId: users[2]._id.toString(), points: 845, rank: 3 },
  ]);

  await Workout.insertMany([
    {
      title: 'HIIT Cardio',
      difficulty: 'Intermediate',
      durationMinutes: 25,
      focus: 'Endurance',
    },
    {
      title: 'Core Stability',
      difficulty: 'Beginner',
      durationMinutes: 20,
      focus: 'Mobility',
    },
    {
      title: 'Power Strength',
      difficulty: 'Advanced',
      durationMinutes: 40,
      focus: 'Full body',
    },
  ]);

  console.log('Seeded octofit_db with sample data');
  console.log({ users: users.length, teams: teams.length, activities: activities.length });

  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
