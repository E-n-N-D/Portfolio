import mongoose, { Schema, Model } from 'mongoose';
import type { ITeamDocument } from '@/types';

const TeamSchema = new Schema<ITeamDocument>(
  {
    name:  { type: String, required: true, unique: true, trim: true },
    color: { type: String, required: true, default: '#6366f1' },
  },
  { timestamps: true }
);

const Team: Model<ITeamDocument> =
  (mongoose.models.Team as Model<ITeamDocument>) ||
  mongoose.model<ITeamDocument>('Team', TeamSchema);

export default Team;
