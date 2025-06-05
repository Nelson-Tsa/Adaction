import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateButtonComponent } from './requete/update-button/update-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    UpdateButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    UpdateButtonComponent
  ]
})
export class AppModule { }
