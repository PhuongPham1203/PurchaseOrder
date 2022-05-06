import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountManagerRoutingModule } from './account-manager-routing.module';
import { IndexAccountComponent } from './index-account/index-account.component';

console.log("Account-Module load");


@NgModule({
  declarations: [
    
    IndexAccountComponent
  ],
  imports: [
    CommonModule,
    AccountManagerRoutingModule
  ]
})
export class AccountManagerModule { }
