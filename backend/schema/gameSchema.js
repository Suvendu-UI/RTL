import mongoose from "mongoose";
import { Schema } from "mongoose";

const gameSchema = new Schema({
    gameName: {
        type: String,
        require: true
    },
    players: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    scores: {
        type: [Object]
    }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;