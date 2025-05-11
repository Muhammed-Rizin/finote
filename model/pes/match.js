import { Schema, model } from "mongoose";
import { COLLECTIONS } from "../../config/collections.js";
import { getDate, getTime } from "../../helper/functions.js";

const playerSchema = {
  user: { type: Schema.Types.ObjectId, ref: COLLECTIONS.PES.USERS },
  team: { type: Schema.Types.ObjectId, ref: COLLECTIONS.PES.TEAMS },
  score: Number,
};
const schema = new Schema(
  {
    date: String,
    count: Number,
    winner: { type: Schema.Types.ObjectId, ref: COLLECTIONS.PES.USERS },

    playerOne: playerSchema,
    playerTwo: playerSchema,

    ip: { type: String },

    status: { type: Number, default: 0 },
    date: { type: String, default: () => getDate() },
    time: { type: String, default: () => getTime() },
  },
  { timestamps: true, collection: COLLECTIONS.PES.MATCHES }
);

export default model(COLLECTIONS.PES.MATCHES, schema);
