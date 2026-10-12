import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const frontendCodeSpaceName = process.env.VITE_CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
  ...(frontendCodeSpaceName ? [`https://${frontendCodeSpaceName}-5173.app.github.dev`] : []),
]);

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.has(origin) || origin.endsWith('.app.github.dev')) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

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
  const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1 }).lean();
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