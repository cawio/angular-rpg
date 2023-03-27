import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameViewComponent } from './game/game-view/game-view.component';
import { GameLevelComponent } from './game/game-level/game-level.component';
import { GameCombatComponent } from './game/game-combat/game-combat.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full' },
  { path: 'welcome',
    title: 'Angular RPG',
    component: WelcomeScreenComponent },
  { path: 'upload',
    title: 'Angular RPG',
    component: FileUploadComponent },
  { path: 'game',
    title: 'Angular RPG',
    component: GameViewComponent,
    children: [
      { path: '',
        redirectTo: '/game/level',
        pathMatch: 'full'
      },
      { path: 'level',
        component: GameLevelComponent
      },
      { path: 'combat',
        component: GameCombatComponent
      }
    ]},
  { path: '**',
    title: 'Page Not Found',
    component: PageNotFoundComponent,
    pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }