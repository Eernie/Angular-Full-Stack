import Game from '../models/game';
import BaseCtrl from './base';

export default class GameControl extends BaseCtrl {
  model = Game;

  // Insert
  insertGame = (req, res) => {
    req.body['state'] = 'WAITING_FOR_PLAYERS';
    this.insert(req, res);
  }
}
