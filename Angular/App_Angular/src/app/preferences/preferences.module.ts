import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';

console.warn("Preferences Module loaded");


@NgModule({
  declarations: [
    PreferencesComponent
  ],
  imports: [
    CommonModule,
    PreferencesRoutingModule
  ]
})
export class PreferencesModule { }
