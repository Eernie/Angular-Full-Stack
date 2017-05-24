import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { GameService } from './services/game.service';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { OthelloMaterialModule } from './shared/othello-mat.module';
import { PlayVsAiComponent } from './play-vs-ai/play-vs-ai.component';
import { OthelloBoardComponent } from './othello-board/othello-board.component';
import { RoomService } from './services/room.service';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    PlayVsAiComponent,
    OthelloBoardComponent
  ],
  imports: [
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OthelloMaterialModule
  ],
  providers: [
    GameService,
    RoomService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
