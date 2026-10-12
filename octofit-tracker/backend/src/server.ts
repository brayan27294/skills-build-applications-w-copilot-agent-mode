import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    baseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/users', async (_request, response) => {
  const users = await User.find().lean();
  response.json({ baseUrl, users });
});

app.post('/api/users', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json({ message: 'User created', user });
});

app.get('/api/teams', async (_request, response) => {
  const teams = await Team.find().populate('members').lean();
  response.json({ baseUrl, teams });
});

app.post('/api/teams', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json({ message: 'Team created', team });
});

app.get('/api/activities', async (_request, response) => {
  const activities = await Activity.find().populate('user').lean();
  response.json({ baseUrl, activities });
});

app.post('/api/activities', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json({ message: 'Activity logged', activity });
});

app.get('/api/leaderboard', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').sort({ rank: 1 }).lean();
  response.json({ baseUrl, leaderboard });
});

app.get('/api/workouts', async (_request, response) => {
  const workouts = await Workout.find().lean();
  response.json({ baseUrl, workouts });
});

app.post('/api/workouts', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json({ message: 'Workout created', workout });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});

void connectDatabase().catch((error: unknown) => {
  console.error('Unable to connect to MongoDB:', error);
});