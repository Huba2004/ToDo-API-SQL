import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ExpiredTasksAlertComponent } from './expired-tasks-alert/expired-tasks-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ExpiredTasksAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }