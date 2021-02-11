import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import for loading & configuring in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BoxerItemComponent } from './boxer-item/boxer-item.component';
import { BoxerDetailComponent } from './boxer-detail/boxer-detail.component';
import { BoxerService } from './shared/boxer.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { BoxerEditComponent } from './boxer-edit/boxer-edit.component';
import { BoxerData } from './shared/boxer-data';
import { HttpClientModule } from '@angular/common/http';
import { BoxerNewComponent } from './boxer-new/boxer-new.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    BoxerItemComponent,
    BoxerDetailComponent,
    BoxerEditComponent,
    BoxerNewComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(BoxerData)
  ],
  providers: [BoxerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
