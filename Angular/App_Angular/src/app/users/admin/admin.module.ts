import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

console.warn("admin module loaded");

@NgModule({
  declarations: [
    ListComponent,
    LoginComponent,
    AdminComponent,
    AdminManageComponent,
    AdminDeleteComponent,
    AdminEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
