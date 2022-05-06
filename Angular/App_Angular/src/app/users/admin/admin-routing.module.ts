import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoGuard } from 'src/app/Guards/account-info.guard';
import { AdminAccessGuard } from 'src/app/Guards/admin-access.guard';
import { SuperAdminGuard } from 'src/app/Guards/super-admin.guard';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
	{
		path: "",
		canActivate: [SuperAdminGuard],
		children: [
			{
				path: "", component: AdminComponent
			},
			{
				path:"",
				canActivateChild: [AdminAccessGuard],
				children: [
					{ path: "list", component: ListComponent },
					{ path: "manage", component: AdminManageComponent, resolve:{data:AccountInfoGuard} },
					{ path: "edit", component: AdminEditComponent },
					{ path: "delete", component: AdminDeleteComponent }
				]
			}

		]
	}


];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
