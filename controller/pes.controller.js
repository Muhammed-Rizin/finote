import { COLLECTIONS } from "../config/collections.js";
import models from "../model/index.js";

export const teams = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };

  const data = await models.PesTeam.find(condition, "date time name logo")
    .sort({ createdAt: -1 })
    .lean();

  return new Response("Success", { data }, 200);
});

export const createTeam = asyncErrorHandler(async (req) => {
  let { name, logo } = req.body;

  name = name?.trim();

  if (isNull(name)) throw new Error("The field 'Name' is required", 400);

  const exists = await models.PesTeam.findOne({
    status: 0,
    name: { $regex: name, $options: "i" },
  });
  if (exists) throw new Error(`Account with name '${name}' already exists`, 400);

  await models.PesTeam({ name, logo }).save();

  return new Response("Team added successfully", null, 200);
});

export const matches = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };

  const data = await models.PesMatch.find(condition, "date playerOne playerTwo count winner")
    .populate("playerOne.user", "name")
    .populate("playerOne.team", "name logo")
    .populate("playerTwo.user", "name")
    .populate("playerTwo.team", "name logo")
    .sort({ createdAt: -1 })
    .lean();

  return new Response("Success", { data }, 200);
});

export const createMatch = asyncErrorHandler(async (req) => {
  let { date } = req.body;
  let { playerOne, playerOneTeam, playerOneScore } = req.body;
  let { playerTwo, playerTwoTeam, playerTwoScore } = req.body;

  if (isNull(playerOne)) throw new Error("The field 'Player One' is required", 400);
  if (isNull(playerOneTeam)) throw new Error("The field 'Player One Team' is required", 400);
  if (isNull(playerOneScore)) throw new Error("The field 'Player One Score' is required", 400);

  if (isNull(playerTwo)) throw new Error("The field 'Player Two' is required", 400);
  if (isNull(playerTwoTeam)) throw new Error("The field 'Player Two Team' is required", 400);
  if (isNull(playerTwoScore)) throw new Error("The field 'Player Two Score' is required", 400);

  if (isNull(date)) throw new Error("The field 'Date' is required", 400);

  const count = await models.PesMatch.countDocuments({ status: 0 });

  let winner;

  if (playerOneScore > playerTwoScore) winner = playerOne;
  else if (playerOneScore < playerTwoScore) winner = playerTwo;

  await models
    .PesMatch({
      date,
      winner,
      count: count + 1,
      ip: req.ip,
      playerOne: {
        user: playerOne,
        team: playerOneTeam,
        score: playerOneScore,
      },
      playerTwo: {
        user: playerTwo,
        team: playerTwoTeam,
        score: playerTwoScore,
      },
    })
    .save();

  return new Response("Match added successfully", null, 200);
});

export const dashboardDetails = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };
  const wins = await models.PesUser.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: COLLECTIONS.PES.MATCHES,
        localField: "_id",
        foreignField: "winner",
        as: "wins",
      },
    },
    { $project: { name: 1, wins: { $size: "$wins" } } },
  ]);

  const matches = await models.PesMatch.find(condition, "date playerOne playerTwo count winner")
    .populate("playerOne.user", "name")
    .populate("playerOne.team", "name logo")
    .populate("playerTwo.user", "name")
    .populate("playerTwo.team", "name logo")
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return new Response("Success", { wins, matches }, 200);
});

export const userOptions = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };
  const data = await models.PesUser.find(condition, "name").lean();

  return new Response("Success", { data }, 200);
});

export const teamOptions = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };
  const data = await models.PesTeam.find(condition, "name").lean();

  return new Response("Success", { data }, 200);
});
