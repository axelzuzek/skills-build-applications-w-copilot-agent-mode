"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_js_1 = require("../models/user.js");
const team_js_1 = require("../models/team.js");
const activity_js_1 = require("../models/activity.js");
const leaderboard_js_1 = require("../models/leaderboard.js");
const workout_js_1 = require("../models/workout.js");
// Seed the octofit_db database with test data
async function seedDatabase() {
    const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        user_js_1.User.deleteMany({}),
        team_js_1.Team.deleteMany({}),
        activity_js_1.Activity.deleteMany({}),
        leaderboard_js_1.Leaderboard.deleteMany({}),
        workout_js_1.Workout.deleteMany({}),
    ]);
    const users = await user_js_1.User.insertMany([
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
    const teams = await team_js_1.Team.insertMany([
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
    const activities = await activity_js_1.Activity.insertMany([
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
    await leaderboard_js_1.Leaderboard.insertMany([
        { userId: users[0]._id.toString(), points: 980, rank: 1 },
        { userId: users[1]._id.toString(), points: 912, rank: 2 },
        { userId: users[2]._id.toString(), points: 845, rank: 3 },
    ]);
    await workout_js_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
