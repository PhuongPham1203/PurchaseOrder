import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from '../Guards/Account/account.guard';
import { IndexAccountComponent } from './index-account/index-account.component';

const routes: Routes = [
	{path:"",component:IndexAccountComponent,canActivate:[AccountGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagerRoutingModule { }
