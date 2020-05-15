import { SharedModule } from './shared/shared.module';

import { CoreModule } from './core.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingComponent } from './heading/heading.component';



@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
