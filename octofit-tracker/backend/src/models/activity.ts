import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  calories: number;
  userId: string;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
