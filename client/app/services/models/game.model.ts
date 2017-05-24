import { Model } from '../abstract-http.service';

export class Game implements Model {
  _id: string;
  // The State of the game ( waiting for users, playing, concluded
  state: string;
  vsAi: boolean;
  outcome: string;
}

