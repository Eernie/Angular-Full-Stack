import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { GameService } from '../services/game.service';
import { Game } from '../services/models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'games-component',
  templateUrl: './games.component.html',
})
export class GamesComponent {

  constructor(private gameService: GameService, private router: Router) {
  }

  playVsAi(): void {
    const game = new Game();
    game.vsAi = true;
    this.gameService.create(game).subscribe(result => {
      this.router.navigate(['play', result._id]);
    });
  }
}
