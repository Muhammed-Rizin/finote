import { Schema, model } from "mongoose";
import { COLLECTIONS } from "../../config/collections.js";
import { getDate, getTime } from "../../helper/functions.js";

const schema = new Schema(
  {
    name: String,
    logo: String,

    ip: { type: String },
    uniqueId: { type: String },

    status: { type: Number, default: 0 },
    date: { type: String, default: () => getDate() },
    time: { type: String, default: () => getTime() },
  },
  { timestamps: true, collection: COLLECTIONS.PES.TEAMS }
);

export default model(COLLECTIONS.PES.TEAMS, schema);
