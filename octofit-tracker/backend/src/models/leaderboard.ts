import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

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

export default models.Leaderboard || model('Leaderboard', leaderboardSchema);
