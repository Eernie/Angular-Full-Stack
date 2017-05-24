import * as express from 'express';

import GameControl from './controllers/game';
import Game from './models/game';

export default function setRoutes(app) {

  const gameControl = new GameControl();

  // Cats
  app.route('/api/game').get(gameControl.getAll);
  app.route('/api/game').post(gameControl.insertGame);
  app.route('/api/game/:id').get(gameControl.get);
  app.route('/api/game/:id').put(gameControl.update);
  app.route('/api/game/:id').delete(gameControl.delete);
}
