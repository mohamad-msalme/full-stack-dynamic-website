import mongoose, { Schema, Document } from 'mongoose';

// Define interface for website data
export interface IWebsite extends Document {
  user: mongoose.Types.ObjectId;
  websiteName: string;
  websiteDescription: string;
  targetAudience: mongoose.Types.ObjectId;
  content: string;
}

// Define schema
const WebsiteSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  websiteName: { type: String, required: true },
  websiteDescription: { type: String, required: true },
  targetAudience: { type: Schema.Types.ObjectId, ref: 'TargetAudience', required: true },
  content: { type: String, required: true }
});

// Create and export model
const Website = mongoose.model<IWebsite>('Website', WebsiteSchema);
export default Website;
