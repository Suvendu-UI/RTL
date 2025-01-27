import express from "express";
import z from "zod";
import { createClient } from "redis";
import User from "./schema/userSchema.js";
import Game from "./schema/gameSchema.js";

const submitScoreRouter = express.Router();

const client = createClient();
await client.connect();

submitScoreRouter.post("/", async function (req, res) {
  console.log("1");
  const body = req.body;

  const scores = req.body.scores;
  const username = req.body.username;
  const password = req.body.password;
  const gameName = req.body.gameName;

  const corusername = z.string().email().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const corgameName = z.string().safeParse(gameName);
  const corscores = z.number().safeParse(scores);

  console.log("4");

  if (!(corscores || corusername || corpassword || corgameName )) {
    return res.json({
      msg: "Invalid user details",
    });
  }

  console.log("5");

  const foundUser = await User.findOne({
    username,
    password,
  });

  if(!foundUser) return res.json({
    msg: "User has not games to the playlist"
  })

  const foundGame = await Game.findOne({
    gameName
  })


  if(!foundGame) return res.json({
    msg: "Game is not present"
  })

  console.log("6");

  console.log(foundUser._id);

  try {
    const sent1 = await client.zAdd("racer_scores", {
      score: Number(scores),
      value: foundUser.username.toString(),
    });
  } catch (error) {
    console.log(error);
  }

  console.log("7");

  const sortIt = await client.zRangeWithScores("racer_scores", 0, -1);

  if(foundGame.scores != null){
    foundGame.scores.pop();
    foundGame.scores.push(sortIt);
  }

  console.log("8");

  foundGame.save();

  if (sortIt) {
    return res.json({
      msg: "new ranking found",
      sortIt,
    });
  }

  console.log("9");

  return res.json({
    msg: "update unsuccessful",
  });
});

export default submitScoreRouter;
