import mongoose from "mongoose";
import e from "express";
import { z } from "zod";
import Game from "./gameSchema";


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


    const gameCreated = await Game
})