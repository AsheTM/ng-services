import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BroadcastChannelModule } from '@ashetm/ng-broadcast-channel';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BroadcastChannelModule,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
