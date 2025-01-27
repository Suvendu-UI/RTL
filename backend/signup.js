import e from "express";
import User from "./schema/userSchema.js";
import z from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "./secret/config.js";
import submitScoreRouter from "./submitScores.js";
import addGameRouter from "./schema/addGame.js";
import {addUserToGameRouter , removeUserFromGameRouter, showLeaderBoardRouter } from "./addUserToGame.js";

const app = e();

const signupRouter = e.Router();

signupRouter.post("/", async function (req, res, next) {
  const body = req.body;

  const username = body.username;
  const password = body.password;
  const playerName = body.playerName;

  const corusername = z.string().email().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const corplayerName = z.string().safeParse(playerName);

  if (!(corpassword || corusername || corplayerName)) {
    return res.json({
      msg: "Invalid user details",
    });
  }

  try {

    const foundUser = await User.findOne({
      username,
      password,
      playerName
  })

  if(foundUser) return res.json({
    msg: "User has already signed in"
  })


    const objectMade = await User.create({
      username,
      password,
      playerName
    });

    const token = jwt.sign(
      {
        username,
        password,
      },
      JWT_SECRET
    );

    console.log(objectMade);

    return res.json({
      msg: "User account created",
      token
    });

  } catch (error) {
    console.log(error);
  }

  return res.json({
    msg: "User account creation unsuccessful",
  });

});

signupRouter.use('/submitScores', submitScoreRouter);
signupRouter.use('/addGame', addGameRouter);
signupRouter.use('/addUserToGame', addUserToGameRouter);
signupRouter.use('/removeUserFromGame', removeUserFromGameRouter );
signupRouter.use('/showLeaderBoard', showLeaderBoardRouter);

export { signupRouter };