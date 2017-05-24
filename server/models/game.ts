import * as mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  // The State of the game ( waiting for users, playing, concluded
  state: String,
  vsAi: Boolean,
  outcome: String
});

const Game = mongoose.model('Game', gameSchema);

export default Game;


