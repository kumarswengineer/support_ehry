import { Injectable } from '@angular/core';
// import { Http, Headers, Response, ResponseContentType } from '@angular/http';
// tslint:disable-next-line:import-blacklist
// import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { commonhelper, ReposneContentTypes } from './commonhelper';
// import { retry } from 'rxjs/operators/retry';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable()
// tslint:disable-next-line:class-name
export class CommonService extends commonhelper {


    constructor(public http: HttpClient) {
        super();
    }

    public practicemodel: any;


    adminGetBrowserDetails() {
        let adminBrowserDetails = '', adminBrowserDetailsToReturn = '';
        try {

            // var nVer = navigator.appVersion;
            const nAgt = navigator.userAgent;
            let browserName = navigator.appName;
            let fullVersion = '' + parseFloat(navigator.appVersion);
            let majorVersion = parseInt(navigator.appVersion, 10);
            let nameOffset, verOffset, ix;

            // In Opera, the true version is after "Opera" or after "Version"
            if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
                browserName = 'Opera';
                fullVersion = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }
            } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
                browserName = 'Microsoft Internet Explorer';
                fullVersion = nAgt.substring(verOffset + 5);
            } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
                browserName = 'Chrome';
                fullVersion = nAgt.substring(verOffset + 7);
            } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
                browserName = 'Safari';
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }
            } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
                browserName = 'Firefox';
                fullVersion = nAgt.substring(verOffset + 8);
            } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
                (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);
                if (browserName.toLowerCase() === browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }
            // trim the fullVersion string at semicolon/space if present
            if ((ix = fullVersion.indexOf(';')) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }
            if ((ix = fullVersion.indexOf(' ')) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }

            majorVersion = parseInt('' + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            adminBrowserDetails = 'Browser name  = ' + browserName + '<br>'
                + 'Full version  = ' + fullVersion + '<br>'
                + 'Major version = ' + majorVersion + '<br>'
                + 'navigator.appName = ' + navigator.appName + '<br>'
                + 'navigator.userAgent = ' + navigator.userAgent + '<br>';

            try {
                adminBrowserDetailsToReturn += '<B>Browser Info     : </B> <br>' + adminBrowserDetails +
                    'Window Inner Reolution = width X height = ' + window.innerWidth + ' X ' + window.innerHeight + '<br>'
                    + 'Window Outer Reolution = width X height = ' + window.outerWidth + ' X ' + window.outerHeight + '<br>'
                    + 'Screen Reolution = width X height = ' + screen.width + ' X ' + screen.height + '<br><br>';
            } catch (err) {
                adminBrowserDetailsToReturn = adminBrowserDetails;
            }
        } catch (err) {

        }
        return adminBrowserDetailsToReturn;
    }

    PostData(MethodUrl: any, Data: any, timeout?: any): Observable<any> {
        // orgmodel = Config.OASOrganizationModel;
        // Config.OASOrganizationModel = {
        //     OrganizationID: 1,
        // };
        // if (
        //     !this.hasValue(Config.OASOrganizationModel) &&
        //     MethodUrl.indexOf('UserLoginListToValidate') < 0
        // ) {
        //     return Observable.create((observer: any) => {
        //         observer.next();
        //         observer.complete();
        //     });
        // } else {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');


        headers.append('Access-Control-Allow-Origin', 'http://localhost:8084');
        headers.append('Access-Control-Allow-Credentials', 'true');

        if (!this.hasValue(Config.OASOrganizationModel)) {
        }
        Data.practicemodel = {
            DBServerName: "192.168.0.35",
            PracticeID: 36,
            LoggedUserID: 42,
            practicesettingsmodel: {},
            emrurlsmodel: {},
        };
        Data.orgmodel = {
            LoggedUserID: 42,
            OrganizationID: 2018083117190728
        }


        return Observable.create((observer: any) => {

            const element = $('#divRowAjaxBusyIndicator');
            element.show();
            element.addClass('busyloaderadded');
            this.http.post(MethodUrl, Data, { headers: headers }).subscribe(
                data => {

                    if (this.hasValue(data)) {
                        observer.next(data);
                    } else {
                        observer.next();
                    }

                    observer.complete();
                    element.hide();
                    element.removeClass('busyloaderadded');
                },
                err => {
                    element.hide();
                    element.removeClass('busyloaderadded');
                    catchError(err);
                    // this.handleErrors(err);
                    // observer.catch();

                }
            );
        });
        // }
    }

    handleErrors(error: Response) {
        // console.log("error" + JSON.stringify(error.json()));
        return Observable.throw(error);
    }



    // ######### SEND EXCEPTIONAL TRACE LOG TO MAIL COLLECTING SCREEN SHOT BLOCK START ##############
    // *******PURPOSE: THIS METHOD IS USED TO SEND ERROR DETAILS FROM MOBILE TO MAIL FOR MAINTAINENCE HERE WE COLLECT SCREEN SHOT
    // *******CREATED BY: AHMED BASHA SHAIK
    // *******CREATED DATE: 02/25/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED;
    sendExceptionalTraceLogToMail(exceptionEncountered: any, methodNameWhereExceptionRise: any) {
        try {
            this.captureScreenShotWhenErrorHit().then((result: { URI: string | undefined; }) => {

                this.sendTraceLogMail(exceptionEncountered, methodNameWhereExceptionRise, result.URI);

            }, (err:any) => {
                this.sendTraceLogMail(exceptionEncountered, methodNameWhereExceptionRise);
            });

        } catch (Exception) {

        }



    }
    // ######### SEND EXCEPTIONAL TRACE LOG TO MAIL COLLECTING SCREEN SHOT BLOCK START ##############

    // ######### SEND EXCEPTIONAL TRACE LOG TO MAIL BLOCK START ##############
    // *******PURPOSE: THIS METHOD IS USED TO SEND ERROR DETAILS FROM MOBILE TO MAIL FOR MAINTAINENCE
    // *******CREATED BY: AHMED BASHA SHAIK
    // *******CREATED DATE: 02/27/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED;
    sendTraceLogMail(exceptionEncountered: any, methodNameWhereExceptionRise?: any, screenshotimage?:any) {

        let body = '';
        let subject = '';

        try {

            body = '<html><body>';
            body = body.concat('<B>Practice Info       : </B><br />  <br />');

            if (this.hasValue(Config.OASOrgModel)) {
                body = body.concat('Practice Name : ' + Config.OASOrgModel.PracticeName);
                body = body.concat('<br /><B>Practice ID     : </B> ' + Config.OASOrgModel.OrganizationID + '<br>');
                body = body.concat('<B>Logged UserName   : </B> ' + Config.OASOrgModel.LoggedUserName + '<br>');
            }

            body = body.concat('<B>Mobile Method Name   : </B> ' + methodNameWhereExceptionRise + '<br>');
            body = body.concat('<B>Error Details : </B> <br>' + exceptionEncountered + '<br><br> ');

            body = body.concat('<B>Browser Details : </B> <br>' + this.adminGetBrowserDetails() + '<br><br> ');

            subject = 'EHR OFFLINE Application Error';

            // if (this.platform.is('android')) {
            //     subject = "EHR OFFLINE Application Error on Android";
            // } else if (this.platform.is('ios')) {
            //     subject = "EHR OFFLINE Application Error on IOS";
            // } else if (this.platform.is('windows')) {
            //     subject = "EHR OFFLINE Application Error on Windows";
            // } else if (this.platform.is('core')) {
            //     subject = "EHR OFFLINE Application Error on Windows Core";
            // }

            // var json = "";
            const jsonObjectForMailSending = {
                mailSubject: subject,
                mailBody: btoa(body),
                // tslint:disable-next-line:max-line-length
                mailAttachmentInBase64Format: this.hasValue(screenshotimage) ? screenshotimage.substring('data:image/jpeg;base64,'.length, screenshotimage.length - 1) : undefined,
                practicemodel: Config.OASOrgModel
            };

            // this.PostData(Config.EMRCommonService + "SendJavaScriptErrorMails", jsonObjectForMailSending).subscribe((data) => {

            // });

        } catch (Exception) {

        }


    }

    // ######### SEND EXCEPTIONAL TRACE LOG TO MAIL BLOCK ENDS ##############



    // ######### CAPTURE SCREEN SHOT WHEN ANY ERROR HIT BLOCK START ##############
    // *******PURPOSE: THIS METHOD IS USED TO TAKE SCREEN SHOT
    // *******CREATED BY: AHMED BASHA SHAIK
    // *******CREATED DATE: 02/25/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED;
    captureScreenShotWhenErrorHit(): any {
        // return Screenshot.URI(10);
        return;
    }
    // ######### CAPTURE SCREEN SHOT WHEN ANY ERROR HIT BLOCK ENDS ##############




    /*
        this method is useful in getting the list
    */
    getCommonDataRelatedToReportWithSingleSearch(inputFormID: any, inputReportID: any,
        inputFieldID?: any, inputFieldSearchData?: any): any {

        const that = this;

        if (!this.hasValue(inputFormID) || !this.hasValue(inputReportID)) {
            return Observable.create((observer: any) => {
                observer.next();
                observer.complete();
            });
        }

        // tslint:disable-next-line:prefer-const
        let PostDataService: any = {
            FormID: inputFormID,
            CommonSearchFilterFieldsData: [],
            ReportID: inputReportID
        };

        if (this.hasValue(inputFieldID) && this.hasValue(inputFieldSearchData)) {
            PostDataService.CommonSearchFilterFieldsData = [
                {
                    FieldID: inputFieldID,
                    FieldValue: inputFieldSearchData
                }
            ];
        }

        return Observable.create((observer: any) => {

            that.PostData(Config.OASAppnURL + 'GetFormData_List', PostDataService).subscribe(serviceResponse => {

                if (that.isError(serviceResponse)) {
                    observer.next([]);
                    observer.complete();
                } else {
                    let gridListData = [];

                    if (!that.hasValue(serviceResponse) || !that.hasValue(serviceResponse.gridData)) {
                        gridListData = [];
                    } else {
                        gridListData = JSON.parse(serviceResponse.gridData);
                    }

                    observer.next(gridListData);
                    observer.complete();
                }
            });
        });
    }


    getCommonDataRelatedToReportWithSearchFields(inputFormID: any, inputReportID: any,
        CommonSearchFilterFieldsData?: any): any {

        const that = this;

        if (!this.hasValue(inputFormID) || !this.hasValue(inputReportID)) {
            return Observable.create((observer: any) => {
                observer.next();
                observer.complete();
            });
        }

        // tslint:disable-next-line:prefer-const
        let PostDataService: any = {
            FormID: inputFormID,
            CommonSearchFilterFieldsData: [],
            ReportID: inputReportID
        };

        if (this.hasValue(CommonSearchFilterFieldsData) && CommonSearchFilterFieldsData.length > 0) {
            PostDataService.CommonSearchFilterFieldsData = CommonSearchFilterFieldsData;
        }

        return Observable.create((observer: any) => {

            that.PostData(Config.OASAppnURL + 'GetFormData_List', PostDataService).subscribe(serviceResponse => {

                if (that.isError(serviceResponse)) {
                    observer.next([]);
                    observer.complete();
                } else {
                    let gridListData = [];

                    if (!that.hasValue(serviceResponse) || !that.hasValue(serviceResponse.gridData)) {
                        gridListData = [];
                    } else {
                        gridListData = JSON.parse(serviceResponse.gridData);
                    }

                    observer.next(gridListData);
                    observer.complete();
                }
            });
        });
    }

    /* THIS METHOD IS USEFUL IN DELETING THE META DATA */
    DeleteCommonMetaData(inputFormID: any, CommonSavingRowData: any, extrafieldvaluetocarry?: any) {
        const that = this;

        if (!this.hasValue(inputFormID) || !this.hasValue(CommonSavingRowData)
            || !this.hasValue(CommonSavingRowData.RecordID)) {
            return Observable.create((observer: any) => {
                observer.next();
                observer.complete();
            });
        }


        // tslint:disable-next-line:prefer-const
        let PostDataService: any = {
            FormID: inputFormID,
            CommonSavingRowData: CommonSavingRowData
        };

        // sending the filter fields data while deleting the record to delete the dependencies of it
        if (this.hasValue(extrafieldvaluetocarry)) {
            PostDataService.CommonSearchFilterFieldsData = [];
            if (this.hasValue(CommonSavingRowData['c_' + extrafieldvaluetocarry])) {
                PostDataService.CommonSearchFilterFieldsData.push({
                    FieldID: extrafieldvaluetocarry,
                    FieldValue: CommonSavingRowData['c_' + extrafieldvaluetocarry]
                });
            }
        }

        return Observable.create((observer: any) => {

            that.PostData(Config.OASAppnURL + 'DeleteFormData', PostDataService).subscribe(serviceResponse => {

                if (that.isError(serviceResponse)) {
                    observer.next(serviceResponse);
                    observer.complete();
                } else {
                    observer.next(serviceResponse);
                    observer.complete();
                }
            });
        });
    }


    /* THIS METHOD IS USEFUL IN GET THE META LIST DATA */
    GetEditModeDataOfTheFormRecordID(inputFormID: any, CommonSavingRowData: any) {
        const that = this;

        if (!this.hasValue(inputFormID) || !this.hasValue(CommonSavingRowData)
            || !this.hasValue(CommonSavingRowData.RecordID)) {
            return Observable.create((observer: any) => {
                observer.next();
                observer.complete();
            });
        }

        // tslint:disable-next-line:prefer-const
        let PostDataService: any = {
            FormID: inputFormID,
            CommonSavingRowData: CommonSavingRowData
        };

        return Observable.create((observer: any) => {

            that.PostData(Config.OASAppnURL + 'GetFormData_List_Edit', PostDataService).subscribe(serviceResponse => {

                if (that.isError(serviceResponse)) {
                    observer.next();
                    observer.complete();
                } else {
                    observer.next(serviceResponse);
                    observer.complete();
                }
            });
        });
    }


    /// this method is useful in getting the bytes data from the signed url given input in the prescribed format
    /// inputs: @1:  google signed URL
    ///         @2:  ContentType : ReposneContentTypes (check common helper)
    GetStringBytesFromSignedURL(MethodUrl:any, ContentType:any) {
        // when there is no practice model and the method request is not 1st request then ignoring the requests
        if (!this.hasValue(MethodUrl) || !this.hasValue(ContentType)) {
            return Observable.create((observer: any) => {
                observer.next();
                observer.complete();
            });
        } else {

            return Observable.create((observer: any) => {

                const headers = new HttpHeaders();
                headers.append('Content-Type', ContentType);
                // this.http.get(MethodUrl, { responseType: ResponseContentType.Text }).subscribe(data => {

                this.http.get(MethodUrl, { headers: headers, responseType: 'text' }).subscribe(data => {
                    // if (this.hasValue(data.text())) {
                    //     observer.next(data.text());
                    // } else {
                    //     observer.next();
                    // }

                    if (this.hasValue(data)) {

                        observer.next(data);
                    } else {
                        observer.next();
                    }
                    observer.complete();

                }, err => {
                    observer.complete();
                });

            });
        }
    }
    // *******PURPOSE: This method is used to validate email address while leaving entry field
    // Example of calling: onblur="validateEmail(this);"
    // *******CREATED BY: George D
    // *******CREATED DATE: 11/19/2014
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    validateEmail(emailInputBox:any) {
        // tslint:disable-next-line:indent
        // tslint:disable-next-line:indent
        // tslint:disable-next-line:prefer-const
        // tslint:disable-next-line:indent
        const emailText = emailInputBox.value;
        // tslint:disable-next-line:indent
        if (!this.hasValue(emailText)) {
            if (
                this.hasValue(emailInputBox) &&
                this.hasValue($(emailInputBox).siblings())
            ) {
                $(emailInputBox)
                    .siblings()
                    .removeClass(
                        'entypo-cross3 wrongIcon icomoon-checkmark-circle rightIcon'
                    );
            }
            return true;
        }
        // tslint:disable-next-line:max-line-length
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailText)) {
            // tslint:disable-next-line:max-line-length
            if (
                this.hasValue(emailInputBox) &&
                this.hasValue($(emailInputBox).siblings()) &&
                this.hasValue(
                    $(emailInputBox)
                        .siblings()
                        .hasClass('ehremailvalidation')
                ) &&
                $(emailInputBox)
                    .siblings()
                    .hasClass('ehremailvalidation') === true
            ) {
                // tslint:disable-next-line:prefer-const
                let argsData = {
                    EmailAddress: emailText,
                    event: emailInputBox
                };
                // when clicked on enter key sending the message
                $(document).trigger('ehrRealTimeEmailValidation', argsData);
            }
            return true;
        } else {
            this.ShowErrorMessage('Please Enter valid E-Mail.');
            emailInputBox.focus();
            // tslint:disable-next-line:max-line-length
            if (
                this.hasValue(emailInputBox) &&
                this.hasValue($(emailInputBox).siblings()) &&
                this.hasValue(
                    $(emailInputBox)
                        .siblings()
                        .hasClass('ehremailvalidation')
                ) &&
                $(emailInputBox)
                    .siblings()
                    .hasClass('ehremailvalidation') === true
            ) {
                $(emailInputBox)
                    .parent()
                    .css('display', 'flex');
                $(emailInputBox)
                    .siblings()
                    .removeClass(
                        'entypo-cross3 wrongIcon icomoon-checkmark-circle rightIcon'
                    );
                $(emailInputBox)
                    .siblings()
                    .addClass('entypo-cross3 wrongIcon');
            }
            return false;
        }
        // return true;
    }
    // #########EMAIL VALIDATION BLOCK END ##############



}


