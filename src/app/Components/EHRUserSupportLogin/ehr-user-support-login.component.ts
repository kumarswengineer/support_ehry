import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { commonhelper } from 'src/app/common/commonhelper';
import { Config } from 'src/app/common/config';
import { EhrUserSupportLoginService } from './ehr-user-support-login.service';

@Component({
  selector: 'app-ehr-user-support-login',
  templateUrl: './ehr-user-support-login.component.html',
  styleUrls: ['./ehr-user-support-login.component.css']
})
export class EhrUserSupportLoginComponent extends commonhelper implements OnInit {
  UserLoginFormGroup!: FormGroup;
  constructor(private _router: Router, private LoginSerive: EhrUserSupportLoginService) {
    super();
    Config.EMRPracticeModelForOAS =
    {
      "DBServerName": "192.168.0.35", "PracticeID": 1  // Local server
    };
  }

  ngOnInit(): void {
    this.initializeFormControlElements();
  }
  private initializeFormControlElements() {
    this.UserLoginFormGroup = new FormGroup({
      UserName: new FormControl("", Validators.required),
      UserPassword: new FormControl("", Validators.required),
    })
  }
  SupportEmployeeLoginPageSigninClickEvent() {
    if (this.validateLoginInfo()) return;
    this.getPracticeIdBasedOnUserNamethroughGStore();
  }
  validateLoginInfo() {
    if (this.UserLoginFormGroup.get('UserName')!.invalid) {
      this.setFocusonValidationField('Please Enter User Name.', "divUserName")
      return true;
    }
    if (this.UserLoginFormGroup.get('UserPassword')!.invalid) {
      this.setFocusonValidationField('Please Enter Password.', "divUserpassword")
      return true;
    }
    return false;
  }
  setFocusonValidationField(message: string, focusId: string) {
    this.ShowErrorMessage(message);
    document.getElementById(focusId)!.focus();


  }
  getPracticeIdBasedOnUserNamethroughGStore() {
    this.getPracticeInformationBasedOnPracticeID(36);
    // this.LoginSerive.GetPracticeIDByUserNameGStore(this.UserLoginFormGroup.value).subscribe((response: any) => {
    //   let responseObject = response;

    //   //if error occured while getting practice id then getting fro m db server as we are synching to all db servers
    //   if (this.hasValue(responseObject) && this.hasValue(responseObject.length) && responseObject.length > 0) {
    //     responseObject = responseObject[0];
    //   }

    //   if (responseObject != undefined && responseObject.RequestExecutionStatus != undefined && parseInt(responseObject.RequestExecutionStatus) < 0 && parseInt(responseObject.RequestExecutionStatus) != -3) {

    //     //if error occured while getting practice id then getting fro m db server as we are synching to all db servers
    //     this.getPracticeIdBasedOnUserNamethroughDb();
    //     return false;
    //   }

    //   //if not able to get practice id from datastore without any error then verify in db
    //   else if (!this.hasValue(response) || !this.hasValue(response.ResponseID) || parseInt(response.ResponseID) <= 0) {
    //     //if error occured while getting practice id then getting fro m db server as we are synching to all db servers
    //     this.getPracticeIdBasedOnUserNamethroughDb();


    //     return false;
    //   }
    //   //EMR LOGIN
      
    // });
  }
  getPracticeIdBasedOnUserNamethroughDb() {
    this.LoginSerive.GetPracticeIdBasedOnUserName(this.UserLoginFormGroup.value).subscribe((response: any) => {
      if (this.isError(response)) return;
      if (!this.hasValue(response) || !this.hasValue(response.ResponseID) || parseInt(response.ResponseID) <= 0) {
        this.setFocusonValidationField("Please Enter Valid Login Details", "divUserName")
        return;
      }
      this.getPracticeInformationBasedOnPracticeID(response.ResponseID);
    });
  }
  getPracticeInformationBasedOnPracticeID(PracticeId: number) {
    Config.EMRPracticeModelForOAS.PracticeID = PracticeId;
    const postData = {
      IsFromLogin: true,
      practicemodel: Config.EMRPracticeModelForOAS
    }
    this.LoginSerive.GetPracticeInformationBasedOnPracticeID(postData).subscribe((response: any) => {
      if (this.isError(response)) return;
      if (this.hasValue(response) && this.hasValue(response.practicemodel) && (response.practicemodel.PracticeID > 0)) {
        Config.EMRPracticeModelForOAS = response.practicemodel
        this.validateEHRUserLogins();
      }
      else {
        this.setFocusonValidationField("Please Enter Valid Username and Password", "divUserName")
        return;
      }
    })
  }
  validateEHRUserLogins() {
    this.UserLoginFormGroup.value.practicemodel = Config.EMRPracticeModelForOAS
    this.LoginSerive.ValidateEHRUserLogin(this.UserLoginFormGroup.value).subscribe((response: any) => {
      if (this.isError(response)) {
        this.ShowErrorMessage(response.ErrorMessage);
        return;
      }
      else {
        this.assignInputstoModel(response.practicemodel);
        this._router.navigateByUrl('/home');

      }

    });
  }
  assignInputstoModel(model: any) {
    Config.EMRPracticeModelForOAS = {};
    Config.DBServerName = model.DBServerName;
    Config.UserType = model.UserType;
    Config.EMRPracticeModelForOAS.PracticeID = model.PracticeID;
    Config.EMRPracticeModelForOAS.FullName = `${model.FirstName}` + " " + `${model.LastName}`;
    Config.EMRPracticeModelForOAS.LoggedUserID = model.LoggedUserID;
    Config.EMRPracticeModelForOAS.LoggedUserName = model.LoggedUserName;
    Config.EMRPracticeModelForOAS.PracticeId = model.PracticeID;
    Config.EMRPracticeModelForOAS.PracticeName = model.PracticeName;
    Config.OASOrgModel.LoggedUserID = model.LoggedUserID;
    Config.OASOrgModel.OrganizationID = 2018083117190728
  }
}
