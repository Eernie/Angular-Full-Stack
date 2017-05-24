import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'play-vs-ai-component',
  templateUrl: './play-vs-ai.component.html',
})
export class PlayVsAiComponent implements OnInit {

  private subs: Subscription[] = [];
  private board: BehaviorSubject<Number[][]> = new BehaviorSubject(null);
  private gameId: string;
  private playersTurn: number;


  constructor(private roomService: RoomService, private gameService: GameService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.push(this.router.params.map(params => params['id'])
      .flatMap(id => this.gameService.get(id))
      .subscribe(game => {
        this.gameId = game._id;
        this.roomService.join(game._id);
        this.roomService.onEvents(game._id, this.onEvent.bind(this));
      }));
  }

  public move(event) {
    this.roomService.doMove(this.gameId, event[0], event[1]);
  }

  public onEvent(event) {
    console.log(event);
    switch (event.type) {
      case 'BOARD_DIGEST':
        this.board.next(event.board);
        this.playersTurn = event.playersTurn;
    }
  }
}


