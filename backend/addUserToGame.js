import e from "express";
import Game from "./schema/gameSchema.js";
import User from "./schema/userSchema.js";
import z from "zod";

const app = e();

const addUserToGameRouter = e.Router();

addUserToGameRouter.post("/", async function (req, res) {
  const gameName = req.body.gameName;
  const username = req.body.username;
  const password = req.body.password;

  const corusername = z.string().email().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const corgameName = z.string().safeParse(gameName);

  if (!(corgameName || corusername || corpassword)) {
    return res.json({
      msg: "Invalid details",
    });
  }

  const findGame  = await Game.findOne({
    gameName
  })

  const findUser = await User.findOne({
    username,
    password
  })

  if(!(findGame)){
    return res.json({
        msg: "Game not created"
    })
  }

  if(!(findUser)){
    return res.json({
        msg: "User not signedin"
    })
  }


  

    

    try {
        const notFound = findGame.players.find(
            findUser._id
        )    

        if(notFound) return res.json({
            msg: "User is already there"
        })


    } catch (error) {
        console.log(error);
    }


    

    const added = findGame.players.push(findUser._id);

    await findGame.save()

    return res.json({
        msg: "User added to Game"
    })

  

  return res.json({
    msg: "Addition unsuccessfull"
  })
  

});

export default addUserToGameRouter;
