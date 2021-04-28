import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { EhrUserSupportLoginRoutingModule } from './ehr-user-support-login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EhrUserSupportLoginService } from './ehr-user-support-login.service';
import { EhrUserSupportLoginComponent } from './ehr-user-support-login.component';

@NgModule({
  declarations: [
    EhrUserSupportLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EhrUserSupportLoginRoutingModule,
    HttpClientModule
  ],
  providers:[EhrUserSupportLoginService]
})
export class EhrUserSupportLoginModule { }
