import * as minimax from 'aye-aye';

export class OthelloState {
  constructor(public board: number[][], public nextPlayer: number) {
  }

  public isTerminal(): boolean {
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        if (this.board[x][y] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  public nextAgent(): minimax.MIN | minimax.MAX {
    if (this.nextPlayer === 1) {
      return minimax.MIN;
    } else {
      return minimax.MAX;
    }
  }

  public utility(): number {
    if (this.isTerminal()) {
      let score = 0;
      for (let x = 0; x < this.board.length; x++) {
        for (let y = 0; y < this.board[x].length; y++) {
          const cell = this.board[x][y];
          if (cell === this.nextPlayer) {
            score++;
          }
        }
      }

      if (score === 32) { // draw, 0?
        return 0;
      } else if (score > 32) { // player won
        return 999999999;
      } else { // player lost
        return -999999999;
      }
    }

    let score = 0;
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        const cell = this.board[x][y];
        if (cell === this.nextPlayer) {
          score += BOARD_EVALUATION[x][y];
        }
      }
    }
    return score;
  }

  public possibleActions(): OthelloAction[] {
    const actions = [];
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        if (this.isCellPossibleStep(this.board, x, y, this.nextPlayer)) {
          actions.push(new OthelloAction(x, y, this.nextPlayer));
        }
      }
    }
    return actions;
  }

  public play(action: OthelloAction): OthelloState {
    const newBoard = JSON.parse(JSON.stringify(this.board));
    newBoard[action.x][action.y] = action.player;

    /** iterating over all 8 possible directions */
    for (let k = 0; k < DIRECTIONS.length; k++) {
      const dx = DIRECTIONS[k][0];
      const dy = DIRECTIONS[k][1];
      /** scanning through all fields in line with the current direction */
      for (let i = action.x + dx, j = action.y + dy;
           i >= 0 && i < 8 && j >= 0 && j < 8; i += dx, j += dy) {
        if (newBoard[i][j] === 0) {
          break;
        }
        if (i === action.x + dx && j === action.y + dy && newBoard[i][j] === action.player) break;
        else if (newBoard[i][j] === action.player) {
          for (let x = action.x, y = action.y;
               x !== i || y !== j;
               x += dx, y += dy) {
            newBoard[x][y] = action.player;
          }
        }
      }
    }

    return new OthelloState(newBoard, this.nextPlayer === 1 ? 2 : 1);
  }

  private isCellPossibleStep(board: Number[][], x: number, y: number, user: number) {
    if (board[x][y] !== 0) return false;
    /** iterating over all 8 possible directions */
    for (let k = 0; k < DIRECTIONS.length; k++) {
      const dx = DIRECTIONS[k][0];
      const dy = DIRECTIONS[k][1];
      /** scanning through all fields in line with the current direction */
      for (let i = x + dx, j = y + dy;
           i >= 0 && i < 8 && j >= 0 && j < 8; i += dx, j += dy) {
        if (i === x + dx && j === y + dy && board[i][j] === user) break;
        if (board[i][j] === 0) break;
        else if (board[i][j] === user) return true;
      }
    }
    return false;
  }
}

export class OthelloAction {
  x: number;
  y: number;
  player: number;

  constructor(x: number, y: number, player: number) {
    this.x = x;
    this.y = y;
    this.player = player;
  }
}

const DIRECTIONS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const BOARD_EVALUATION = [
  [500, -30, 16, 12, 12, 16, -30, 500],
  [-30, -100, -4, -3, -3, -4, -100, -30],
  [16, -4, 7, 4, 4, 7, -4, 16],
  [12, -3, 4, 0, 0, 4, -3, 12],
  [12, -3, 4, 0, 0, 4, -3, 12],
  [16, -4, 7, 4, 4, 7, -4, 16],
  [-30, -100, -4, -3, -3, -4, -100, -30],
  [500, -8, 8, 6, 6, 8, -8, 500],
];
