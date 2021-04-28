
import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/common/config';
import { CommonService } from 'src/app/common/common.service';


@Injectable()
export class EhrUserSupportLoginService  extends CommonService   {
    constructor(http: HttpClient) {
        super(http);
      }
      ValidateEHRUserLogin(postData: any) {
        postData.practicemodel = Config.EMRPracticeModelForOAS;
           return this.PostData('http://localhost/EHR_Login_WebAPI/EHRLogin/ValidateUserLoginsFromSupport', postData).pipe(((response) => {
       //return this.PostData(Config.EMRPracticeModelForOAS.emrurlsmodel.EMRWebWCFPrimaryExternalURL + 'EHR_Login_WebAPI/EHRLogin/ValidateUserLoginsFromSupport', postData).pipe(((response) => {
        // return this.PostData(Config.EMRPracticeModelForOAS.emrurlsmodel.EMRWebWCFPrimaryExternalURL + 'EMR_Web_WCF_Common/EMRCommon/ValidateUserLogin', postData).pipe(((response) => {
            return response;
        }));
    }
    GetPracticeIdBasedOnUserName(postData: any) {
        postData.practicemodel = Config.EMRPracticeModelForOAS;
        return this.PostData(Config.EHR_LogingApi + 'GetPracticeIdBasedOnUserName', postData).pipe(((response) => {
            return response;
        }));
    }
    GetPracticeInformationBasedOnPracticeID(postData: any) {
        postData.practicemodel = Config.EMRPracticeModelForOAS;
        return this.PostData(Config.EHR_LogingApi + 'GetPracticeInformationBasedOnUserNameAndPID', postData).pipe(((response) => {
            return response;
        }));
    }
    GetPracticeIDByUserNameGStore(postData: any) {
        postData.practicemodel = Config.EMRPracticeModelForOAS;
        return this.PostData(Config.EHRGoogleDataStoreAPI + 'GetPracticeIDByUserNameGStore', postData).pipe(((response) => {
            return response;
        }));
    }
}