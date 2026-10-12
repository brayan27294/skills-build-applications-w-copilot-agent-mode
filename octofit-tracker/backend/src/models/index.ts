import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    age: { type: Number, min: 16 },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    focus: { type: String, default: 'general fitness' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    displayName: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    exercises: [{ type: String }],
  },
  { timestamps: true },
);

export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);
