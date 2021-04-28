import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EhrUserTicketInformationComponent } from './ehr-user-ticket-information.component';

const routes: Routes = [{ path: '', component: EhrUserTicketInformationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EhrUserTicketInformationRoutingModule { }
