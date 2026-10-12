import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    focus: { type: String, default: 'general fitness' },
  },
  { timestamps: true },
);

export default models.Team || model('Team', teamSchema);
