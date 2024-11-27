import { Schema, model } from "mongoose";
import { COLLECTIONS } from "../config/collections.js";
import { getDate, getTime } from "../helper/functions.js";

const schema = new Schema(
  {
    name: String,
    user: { type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS },

    ip: { type: String },
    uniqueId: { type: String },

    status: { type: Number, default: 0 },
    date: { type: String, default: () => getDate() },
    time: { type: String, default: () => getTime() },

    upDate: { type: String, default: () => getDate() },
    upTime: { type: String, default: () => getTime() },
  },
  { timestamps: true, collection: COLLECTIONS.CATEGORY }
);

export default model(COLLECTIONS.CATEGORY, schema);
