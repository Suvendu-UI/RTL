import e from "express";
import Game from "./schema/gameSchema.js";
import User from "./schema/userSchema.js";
import z from "zod";

const app = e();

const addUserToGameRouter = e.Router();
const removeUserFromGameRouter = e.Router();

addUserToGameRouter.post("/", async function (req, res) {
  console.log("1");

  const gameName = req.body.gameName;
  const username = req.body.username;
  const password = req.body.password;

  const corusername = z.string().email().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const corgameName = z.string().safeParse(gameName);

  console.log("2");

  if (!(corgameName || corusername || corpassword)) {
    return res.json({
      msg: "Invalid details",
    });
  }

  console.log("3");

  const findGame = await Game.findOne({
    gameName,
  });

  console.log("4");

  if (!findGame) {
    return res.json({
      msg: "Game not created",
    });
  }

  const findUser = await User.findOne({
    username,
    password,
  });

  console.log("4");

  if (!findUser) {
    return res.json({
      msg: "User not signedin",
    });
  }

  console.log("5");

  console.log(findUser);

  try {
    console.log("6");

    console.log("8");

    const Found = findGame.players.indexOf(findUser._id);

    console.log(Found);

    console.log("9");

    if (Found >= 0)
      return res.json({
        msg: "User is already there",
      });

    console.log("10");
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("11");

    const added = findGame.players.push(findUser._id);

    console.log("12");

    await findGame.save();

    console.log("13");

    return res.json({
      msg: "User added to Game",
    });
  } catch (error) {
    console.log(error);
  }

  return res.json({
    msg: "Addition unsuccessfull",
  });
});

removeUserFromGameRouter.post("/", async function (req, res) {
  console.log("1");

  const gameName = req.body.gameName;
  const username = req.body.username;
  const password = req.body.password;

  const corusername = z.string().email().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const corgameName = z.string().safeParse(gameName);

  console.log("2");

  if (!(corgameName || corusername || corpassword)) {
    return res.json({
      msg: "Invalid details",
    });
  }

  const findUser = await User.findOne({
    username,
    password,
  });

  if (!findUser) {
    return res.json({
      msg: "No user signed",
    });
  }

  const findGame = await Game.findOne({
    gameName,
  });

  const foundUserInTheScores = findGame.players.indexOf(findUser._id);

  if (foundUserInTheScores < 0)
    return res.json({
      msg: "User has not submitted any scores",
    });

  const removed = findGame.players.splice(foundUserInTheScores, 1);

  await findGame.save();

  return res.json({
    msg: "User removed from the game",
  });
});

showLeaderBoard.post("/", async function (req, res) {});

export { addUserToGameRouter, removeUserFromGameRouter };
