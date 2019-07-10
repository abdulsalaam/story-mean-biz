/* @abdul : 07-07-2019 */
import * as Mongoose from "mongoose";

export interface IStory extends Mongoose.Document {
  userId: string;
  title: string;
  description: string;
  viewCount:number;
  published: boolean;
  status: boolean;
  createdAt: Date;
  updateAt: Date;
}

export const StorySchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    viewCount: { type: Number, required: false },
    title: String,
    description: String,
    status: Boolean,
    published: Boolean
  },
  {
    timestamps: true
  }
);

StorySchema.virtual('ID').get(function() { return this._id; });

export const StoryModel = Mongoose.model<IStory>("Story", StorySchema);
