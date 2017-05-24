import * as express from 'express';

import GameControl from './controllers/game';
import Game from './models/game';
import RoomControl from './controllers/room';

export default function setRoutes(app) {

  const gameControl = new GameControl();
  const roomControl = new RoomControl(gameControl);

  // Cats
  app.route('/api/game').get(gameControl.getAll);
  app.route('/api/game').post(gameControl.insertGame);
  app.route('/api/game/:id').get(gameControl.get);
  app.route('/api/game/:id').put(gameControl.update);
  app.route('/api/game/:id').delete(gameControl.delete);

  app.ws('/api/gameRoom', (ws, req) => {
    ws.on('message', message => roomControl.onMessage(ws, req, message));
  });
}
