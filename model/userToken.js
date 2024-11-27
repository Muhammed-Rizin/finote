import { Schema, model } from "mongoose";
import { COLLECTIONS } from "../config/collections.js";

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: COLLECTIONS.USERS },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 },
  },
  { timestamps: true, collection: COLLECTIONS.USER_TOKEN }
);

export default model(COLLECTIONS.USER_TOKEN, schema);
