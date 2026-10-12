import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});

void connectDatabase().catch((error: unknown) => {
  console.error('Unable to connect to MongoDB:', error);
});