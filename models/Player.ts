import mongoose, { Schema, Model } from 'mongoose';
import type { IPlayerDocument } from '@/types';

const PlayerSchema = new Schema<IPlayerDocument>(
  {
    name: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    medals: {
      gold:   { type: Number, default: 0, min: 0 },
      silver: { type: Number, default: 0, min: 0 },
      bronze: { type: Number, default: 0, min: 0 },
    },
  },
  {
    timestamps: true,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: total points  (gold=3pts, silver=2pts, bronze=1pt)
PlayerSchema.virtual('total').get(function (this: IPlayerDocument) {
  return this.medals.gold * 3 + this.medals.silver * 2 + this.medals.bronze;
});

const Player: Model<IPlayerDocument> =
  (mongoose.models.Player as Model<IPlayerDocument>) ||
  mongoose.model<IPlayerDocument>('Player', PlayerSchema);

export default Player;
