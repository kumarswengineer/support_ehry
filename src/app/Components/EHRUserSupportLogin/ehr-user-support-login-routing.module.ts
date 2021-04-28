import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EhrUserSupportLoginComponent } from './ehr-user-support-login.component';

const routes: Routes = [{ path: '', component: EhrUserSupportLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EhrUserSupportLoginRoutingModule { }
