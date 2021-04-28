export class Config {

    
    static OASOrganizationModel: any={};
    static EMRPracticeModelForOAS: any={};
    static orgmodel:any;
    static DBServerName:any;
    static UserType:any;
    
    // static EMRPracticeModelForOAS=
    // { "DBServerName": "midbserver1pst.wus232abbefe7273.database.windows.net", "PracticeID": 1 };// production server
    static OASWCFCallingURl: string;
    static CommonStoredData: any = {};
    private static AutoLoadModulesInformation: any = {};

    // 1 - for local 2- for QA 3- for production
    static environmentType = 1;

    static WebRootPath = window.location.href;


    static MAX_SIZE = 2_000_000;

    static get OASEmployeeURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI';
    }
    static get OASPracticeURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/PracticeusersApi/';
    }


    static get OASAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/OasAppMainAPi/';
    }

    static get EHR_LogingApi(): string {
        return Config.OASWCFCURL + "EHR_Login_WebAPI/EHRLogin/";
    //  return "https://weblogin.ehryourway.com/EHR_Login_WebAPI/EHRLogin/";
    //    return "https://backupweblocaltest.ehryourway.com/EHR_Login_WebAPI/EHRLogin/"
    }
    static get OASProjectsAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/Projects/';
    }
    static get OASOrganizationAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/Employees/';
    }
    static get OASAccessInformationAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/AccessInformation/';
    }
    static get OASEmployeesInformationAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/EmployeesInformation/';
    }
    static get EHRGoogleDataStoreAPI(): string {
         return Config.OASWCFCURL + "EHRGoogleDataStore/api/GDataStore/";
        //return "https://weblogin.ehryourway.com/EHRGoogleDataStore/api/GDataStore/"
        //  return "https://backupweblocaltest.ehryourway.com/EHRGoogleDataStore/api/GDataStore/"
    }
    static get OASReportsofTasksAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/ReportOfTasks/';
    }
    static get OASPracticeCheckListItemsAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/PracticeMasterCheckList/';
    }
    static get OASPracticeCheckListAppnURL(): string {
        return Config.OASWCFCURL + 'OASApplicationMainAPI/PracticeCheckList/';
    }

    static get OASWCFCURL(): string {
        if (window.location.href.indexOf('localhost') > -1) {
            return 'http://localhost/';
        }
        else if (window.location.href.indexOf('support') > -1) {
            return 'https://supportprod.ehryourway.com/';
        }
        else {
            return "https://itslocal.ehryourway.com/";
        }

    }

    static set OASWCFCURL(theTokenURL: string) {
        Config.OASWCFCallingURl = theTokenURL;
    }


    static get OASOrgModel(): any { return Config.OASOrganizationModel; }

    static set OASOrgModel(theToken: any) {
        Config.OASOrganizationModel = theToken;
    }

    static hasActiveToken() {
        return Config.OASOrgModel;
    }

    static ResetOASOrganizationModel() {
        Config.OASOrgModel = '';
    }

    static set OASAutoLoadModulesInformation(info: any) {
        Config.AutoLoadModulesInformation = info;
    }

    static get OASAutoLoadModulesInformation(): any {
        return Config.AutoLoadModulesInformation;
    }

}
