import { TargetAudience } from "./TargetAudience";

export interface Website {
  _id: string;
  user: string;
  websiteName: string;
  websiteDescription: string;
  targetAudience: TargetAudience;
  content: string;
}
