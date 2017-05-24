import { Room } from './controllers/room';

export abstract class BaseEvent {
  type: string;
  gameId: string;
}

export class JoinEvent extends BaseEvent {
  type = 'JOIN';
}

export class SuccessfullyJoinedTheRoomEvent extends BaseEvent {
  type = 'SUCCESSFULLY_JOINED_ROOM';

  constructor(room: Room) {
    super();
    this.gameId = room.game._id;
  }
}

export class BoardDigestEvent extends BaseEvent {
  type = 'BOARD_DIGEST';
  board: number[][];
  playersTurn: number;

  constructor(room: Room) {
    super();
    this.gameId = room.game._id;
    this.board = room.board;
    this.playersTurn = room.playersTurn;
  }
}

export class RoomHasNoSpotEvent extends BaseEvent {
  type = 'ROOM_IS_FULL';

  constructor(room: Room) {
    super();
    this.gameId = room.game._id;
  }
}

export class MoveEvent extends BaseEvent {
  x: number;
  y: number;
}

export class GameWasConcluded extends BaseEvent {
  type = 'GAME_WAS_CONCLUDED';

  constructor(private winningPlayer: number) {
    super();
  }
}
