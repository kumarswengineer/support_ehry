import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonhelper } from 'src/app/common/commonhelper';
import { Config } from 'src/app/common/config';

@Component({
  selector: 'app-ehr-user-dashboard',
  templateUrl: './ehr-user-dashboard.component.html',
  styleUrls: ['./ehr-user-dashboard.component.css']
})
export class EhrUserDashboardComponent extends commonhelper implements OnInit {
  userFirstAndLastName: any;
  eHRUserDashboardMenuShowHide: boolean = false;
  eHRUserDashboardMenuCollapseShowHide: boolean = false;
  LeftNav: any;

  constructor(private _router: Router) { super(); }

  ngOnInit(): void {
    this.userFirstAndLastName = Config.EMRPracticeModelForOAS.FullName;
    // this.UserName = Config.EMRPracticeModelForOAS.LoggedUserName;
    this.TicketInformationClick();
  }


  eHRUserDashboardMenuCollapseClick() {
    this.eHRUserDashboardMenuShowHide = true;
    this.eHRUserDashboardMenuCollapseShowHide = true;
  }
  eHRUserDashboardMenuExpandClick() {
    this.eHRUserDashboardMenuShowHide = false;
    this.eHRUserDashboardMenuCollapseShowHide = false;
  }
  myFunctionClick() {
    // document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myDropdown")!.style.display = "block";
  }


  eHRUserDashboardMobileMenuClick() {
    document.getElementById('slide-out')!.style.display = 'block';
    document.getElementById('slide-out')!.style.display = 'block';
  }
  closeInMobile() {
    document.getElementById('slide-out')!.style.display = 'none';
    this.LeftNav.currentSelected.subscribe(this.setSelectedNav);
    this.loadCommonInfoOnLoad();
  }
  loadCommonInfoOnLoad() {
    throw new Error('Method not implemented.');
  }
  setSelectedNav(setSelectedNav: any) {
    throw new Error('Method not implemented.');
  }
  ReturnToHomePage() {
    this._router.navigateByUrl('/');
  }
  TicketInformationClick() {
    $('#ehrUserDashboardTicketInformationItem').addClass('active');
    const outletObj = {
      'main': ['ticket-information', this.setCommonData({})],
    };
    this._router.navigate(['/home', { outlets: outletObj }]);
    // this._router.navigate(['/ticket-information']);
  }
  ViewTicketClick() {
    this._router.navigate(['/home', { outlets: { 'main': 'ehr-user-view-ticket' }, }]);
  }
}
