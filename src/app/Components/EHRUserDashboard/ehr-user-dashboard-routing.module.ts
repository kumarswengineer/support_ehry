import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EhrUserDashboardComponent } from './ehr-user-dashboard.component';

const routes: Routes = [{
  path: '', component: EhrUserDashboardComponent,
},
{ path: 'ticket-information', loadChildren: () => import('./ehrUserTicketInformation/ehr-user-ticket-information.module').then(m => m.EhrUserTicketInformationModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EhrUserDashboardRoutingModule { }
