import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';

console.log("Sale-Module load");


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SaleRoutingModule
  ]
})
export class SaleModule { }
