import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideBroadcastChannel } from '@ashetm/ng-broadcast-channel';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [provideBroadcastChannel()],
  bootstrap: [AppComponent]
})
export class AppModule { }
