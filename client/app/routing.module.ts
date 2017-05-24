import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { PlayVsAiComponent } from './play-vs-ai/play-vs-ai.component';


const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'play/:id', component: PlayVsAiComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
