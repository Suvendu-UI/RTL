import e from "express";
import { z } from "zod";
import Game from "../schema/gameSchema.js";


const app = e();

const addGameRouter = e.Router();

addGameRouter.post('/', async function(req, res){
    const gameName = req.body.gameName;
    
    const corgameName = z.string().safeParse(gameName);

    if(!(corgameName)){
        return res.json({
            msg: "Invalid name of game"
        })
    }

    try {

        const notFound = await Game.findOne({
            gameName
        })
    
        if(notFound) return res.json({
            msg: "Game is already there"
        })

        const gameCreated = await Game.create({
            gameName
        })        

        return res.json({
            msg: "Game is successfully created"
        })
    } catch (e) {
        console.log(e)
    }


    return json({
        msg: "Game is unsuccessfull"
    })




})

export default addGameRouter;