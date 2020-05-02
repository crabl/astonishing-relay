import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameplayComponent } from './gameplay/gameplay.component';
import { AdminComponent } from './admin/admin.component';
// import { ReplayMapComponent } from './replay-map/replay-map.component';

const routes: Routes = [{
  path: '',
  component: GameplayComponent
}, {
  path: 'admin',
  component: AdminComponent
}, /* {
  path: 'replay',
  component: ReplayMapComponent
}*/];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
