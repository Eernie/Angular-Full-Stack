import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Game } from '../services/models/game.model';


@Component({
  selector: 'othello-board-component',
  templateUrl: './othello-board.component.html',
  styleUrls: ['othello-board.component.scss'],
})
export class OthelloBoardComponent implements OnInit {

  @Input() private observableBoard: Observable<Number[][]>;
  @Input() private game: Game;

  private board: Number[][];
  private user = 1;



  ngOnInit(): void {
    this.observableBoard.map(board => this.addPossibleSteps(board))
      .subscribe(board =>  this.board = board);
  }

  private play(x: number, y: number): void {
    console.log(`Playing ${x},${y}`);
  }

  private addPossibleSteps(board: Number[][]): Number[][] {
    const newBoard = JSON.parse(JSON.stringify(board));
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (this.isCellPossibleStep(board, i, j, this.user)) {
          newBoard[i][j] = -1;
        }
      }
    }
    return newBoard;
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

const DIRECTIONS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
]
