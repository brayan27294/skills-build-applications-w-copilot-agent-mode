import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

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

export default models.Workout || model('Workout', workoutSchema);
