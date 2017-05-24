import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import * as ReconnectingWebSocket from 'reconnectingwebsocket';

@Injectable()
export class RoomService {

  private ws;
  private eventWatchers = new Map<string, ((any) => void)[]>();

  constructor() {
    const loc = window.location;
    let new_uri;

    if (loc.protocol === 'https:') {
      new_uri = 'wss:';
    } else {
      new_uri = 'ws:';
    }
    new_uri += '//' + loc.host + '/api/gameRoom';
    this.ws = new ReconnectingWebSocket(new_uri);

    this.ws.onmessage = (event) => {
      const object = JSON.parse(event.data);
      if (this.eventWatchers.has(object.gameId)) {
        this.eventWatchers.get(object.gameId).forEach(cb => cb(object));
      }
    };
  }

  join(gameId: string) {
    this.ws.send(JSON.stringify({type: 'JOIN', gameId: gameId}));
  }

  onEvents(gameId, callback: (any) => void) {
    if (!this.eventWatchers.has(gameId)) {
      this.eventWatchers.set(gameId, []);
    }
    this.eventWatchers.get(gameId).push(callback);
  }

  doMove(gameId: string, x: number, y: number) {
    this.ws.send(JSON.stringify({type: 'MOVE', gameId: gameId, x: x, y: y}));
  }
}
