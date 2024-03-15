import mongoose, { Schema, Document } from 'mongoose';

// Define interface for target audience options
interface ITargetAudience extends Document {
  name: string;
}

// Define schema
const TargetAudienceSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }
});

// Create and export model
const TargetAudience = mongoose.model<ITargetAudience>('TargetAudience', TargetAudienceSchema);
export default TargetAudience;