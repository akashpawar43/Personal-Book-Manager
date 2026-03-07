import mongoose, { Document, Schema } from "mongoose";

export type BookStatus = "want_to_read" | "reading" | "completed";

export interface IBook extends Document {
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
  user: mongoose.Types.ObjectId;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["want_to_read", "reading", "completed"],
      default: "want_to_read"
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", bookSchema);