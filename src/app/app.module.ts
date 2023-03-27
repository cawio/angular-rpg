import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GameModule } from './game/game.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    PageNotFoundComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GameModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
