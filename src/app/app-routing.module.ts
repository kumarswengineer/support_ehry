import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EhrUserDashboardComponent } from './components/ehrUserDashboard/ehr-user-dashboard.component';

const routes: Routes = [{ path: '', loadChildren: () => import('./components/ehrUserSupportLogin/ehr-user-support-login.module').then(m => m.EhrUserSupportLoginModule), pathMatch: 'full', },
{
  path: 'home',
  loadChildren: () => import('./components/ehrUserDashboard/ehr-user-dashboard.module').then(m => m.EhrUserDashboardModule),

}];

// const routes: Routes = [
//   { path: '', 
//   loadChildren: () => import('./components/ehrUserSupportLogin/ehr-user-support-login.module').then(m => m.EhrUserSupportLoginModule), pathMatch: 'full', },
//   //loadChildren: () => import('./Components/EHRUserSupportLogin/ehr-user-support-login.module').then(m => m.EhrUserSupportLoginModule) }, 
//   {path: 'home', component: EhrUserDashboardComponent, children: [
//     { path: 'ticket-information', loadChildren: () => import('./components/ehrUserTicketInformation/ehr-user-ticket-information.module').then(m => m.EhrUserTicketInformationModule), outlet: 'main', },
//   ] }

// { path: 'EHRUserDashboard', 
//  loadChildren:'../app/Components/EHRUserDashboard/ehr-user-dashboard.module#EhrUserDashboardModule'},
//  { path: 'ticket-information', loadChildren: '../app/Components/EHRUserTicketInformation/ehr-user-ticket-information.module#EhrUserTicketInformationModule' },

//  loadChildren: () => import('./Components/EHRUserDashboard/ehruser-dashboard.module').then(m => m.EHRUserDashboardModule) }
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
