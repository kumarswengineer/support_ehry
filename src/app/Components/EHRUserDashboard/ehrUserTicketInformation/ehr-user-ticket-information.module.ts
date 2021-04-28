import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EhrUserTicketInformationRoutingModule } from './ehr-user-ticket-information-routing.module';
import { EhrUserTicketInformationComponent } from './ehr-user-ticket-information.component';


@NgModule({
  declarations: [
    EhrUserTicketInformationComponent
  ],
  imports: [
    CommonModule,
    EhrUserTicketInformationRoutingModule
  ]
})
export class EhrUserTicketInformationModule { }
