import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EhrUserDashboardRoutingModule } from './ehr-user-dashboard-routing.module';
import { EhrUserDashboardComponent } from './ehr-user-dashboard.component';


@NgModule({
  declarations: [
    EhrUserDashboardComponent
  ],
  imports: [
    CommonModule,
    EhrUserDashboardRoutingModule
  ]
})
export class EhrUserDashboardModule { }
