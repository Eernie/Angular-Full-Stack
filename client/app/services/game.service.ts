import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AbstractHttpService } from './abstract-http.service';
import { Game } from './models/game.model';

@Injectable()
export class GameService extends AbstractHttpService<Game> {

  constructor(http: Http) {
    super(http, 'game');
  }
}
