import {
  BaseEvent, BoardDigestEvent, JoinEvent, MoveEvent, RoomHasNoSpotEvent,
  SuccessfullyJoinedTheRoomEvent,
} from '../events';
import GameControl from './game';
import * as WebSocket from 'ws';
import * as minimax from 'aye-aye';
import { OthelloAction, OthelloState } from '../othello/othello';

export default class RoomControl {

  private gameRooms: Map<string, Room> = new Map();

  constructor(private gameControl: GameControl) {
  }

  onMessage = (ws, req, message) => {
    const event = <BaseEvent>JSON.parse(message);

    switch (event.type) {
      case 'JOIN':
        this.joinRoom(event, ws);
        break;
      case 'MOVE':
        this.doMove(<MoveEvent>event, ws);
    }
  }

  private joinRoom(event: JoinEvent, ws) {
    this.gameControl.model.findOne({_id: event.gameId}, (err, game) => {
      if (err) {
        return console.error(err);
      }

      if (!this.gameRooms.has(event.gameId)) {
        const room = new Room();
        room.game = game;
        room.player1 = ws;
        room.playersTurn = Math.round(Math.random())+1;
        this.gameRooms.set(event.gameId, room);
        ws.send(JSON.stringify(new SuccessfullyJoinedTheRoomEvent(room)));
        ws.send(JSON.stringify(new BoardDigestEvent(room)));
        this.playIfAIsTurn(room, ws);
      }
      else if (this.gameRooms.get(event.gameId).player1.readyState !== WebSocket.OPEN) {
        const room = this.gameRooms.get(event.gameId);
        room.player1 = ws;
        ws.send(JSON.stringify(new SuccessfullyJoinedTheRoomEvent(room)));
        ws.send(JSON.stringify(new BoardDigestEvent(room)));
        this.playIfAIsTurn(room, ws);
      } else {
        const room = this.gameRooms.get(event.gameId);
        ws.send(JSON.stringify(new RoomHasNoSpotEvent(room)));
      }

    });
  }

  private playIfAIsTurn(room: Room, ws: any) {
    if (room.playersTurn === 2) {
      const currentState = new OthelloState(JSON.parse(JSON.stringify(room.board)), room.playersTurn);
      const actionToTake = room.agent.nextAction(currentState);
      this.move(actionToTake, currentState, room);
      ws.send(JSON.stringify(new BoardDigestEvent(room)));
    }
  }

  private move(actionToTake: OthelloAction, currentState: OthelloState, room) {
    const othelloState = currentState.play(actionToTake);
    room.board = othelloState.board;
    room.playersTurn = othelloState.nextPlayer;

    console.log(room.board);
  }

  private doMove(event: MoveEvent, ws: any) {
    if (this.gameRooms.has(event.gameId)) {
      const room = this.gameRooms.get(event.gameId);
      if (room.player1 === ws) {
        const currentState = new OthelloState(JSON.parse(JSON.stringify(room.board)), room.playersTurn);
        const actionToTake = new OthelloAction(event.x, event.y, 1);
        this.move(actionToTake, currentState, room);
        ws.send(JSON.stringify(new BoardDigestEvent(room)));
        this.playIfAIsTurn(room, ws);
      }
    }
  }
}

export class Room {
  player1: any;
  game: any;
  board: number[][] = INITIAL_BOARD;
  playersTurn: number;
  agent = new minimax.MinimaxAgent(4);

}

const INITIAL_BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
