// tslint:disable-next-line:import-blackl

declare function escape(s: string): string;
declare function unescape(s: string): string;

/**
 * Check if inner html exists inside a any html tag
 * @param body full string to check weather innerHTML exists or not
 * @param tag tag to check for ex. p, body etc..
 */
export function innerHTMLExists(body: string, tag: string): boolean {
    if (!body || !tag) return false;

    return body.replace(`<${tag}>`, '').replace(`</${tag}>`, '').trim().length > 0;
}

// tslint:disable-next-line:class-name
export class commonhelper {
    [x: string]: any;
    public datediff: any;
    // public devicepath: any;
    // comments added
    constructor() { }

    private class2type = {};
    private storedData: any = {};

    private PADCHAR = '=';
    private ALPHA =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    // ######### GET THE RANDOM NUMBER AND UNIQUED ID BLOCK START ##############
    // *******PURPOSE: These methods arfe used in generating the randomly caluculated number and generating the Unique ID's
    // *******CREATED BY: MAEHSH P
    // *******CREATED DATE: 08/01/2016
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // this method returns the randomly generated number
    adminGetRandomNumber() {
        // tslint:disable-next-line:no-bitwise
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); // then to call it, plus stitch in '4' in the third group
    }

    adminGetGUID() {
        return (
            'app-' +
            this.adminGetRandomNumber() +
            this.adminGetRandomNumber() +
            '-' +
            this.adminGetRandomNumber() +
            '-' +
            this.adminGetRandomNumber().substr(0, 3) +
            '-' +
            this.adminGetRandomNumber() +
            '-' +
            this.adminGetRandomNumber() +
            this.adminGetRandomNumber() +
            this.adminGetRandomNumber()
        ).toLowerCase(); // this method returns the created GUID
    }
    // ######### GET THE RANDOM NUMBER AND UNIQUED ID BLOCK START ##############

    hasValueJSON(input: any) {
        if (
            input != null &&
            input !== undefined &&
            input.json() != null &&
            input.json() !== undefined &&
            input.json() !== ''
        ) {
            return true;
        }
        return false;
    }
    // #########             check HAS VALUE OR NOT- BLOCK START             ##############
    // *******PURPOSE: These methods ARE used to check HAS VALUE TO GIVEN PARAMETER
    // *******CREATED BY: ravi teja.p
    // *******CREATED DATE: 2/6/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    hasValue(input: any) {
        if (
            input != null &&
            input !== undefined &&
            input !== '' &&
            input.toString().length > 0
        ) {
            return true;
        }
        return false;
    }

    hasValueResponse(input: any) {
        return this.hasValue(input) && input.toString() !== 'reject';
    }

    // #########             check HAS VALUE OR NOT- BLOCK END             ##############



    private getByte(s: string, i: number): number {
        const x = s.charCodeAt(i);
        return x;
    }
    private getByte64(s: string, i: number): number {
        const idx = this.ALPHA.indexOf(s.charAt(i));
        return idx;
    }

    // #########             DECODE THE STRING- BLOCK START             ##############
    // *******PURPOSE: These methods ARE used to DECODE GIVEN STRING
    // *******CREATED BY: ravi teja.p
    // *******CREATED DATE: 2/6/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    public decode(s: string): string {
        let pads = 0,
            i: any,
            b10: any,
            imax = s.length,
            // tslint:disable-next-line:prefer-const
            x: any = [];

        s = String(s);

        if (imax === 0) {
            return s;
        }

        if (s.charAt(imax - 1) === this.PADCHAR) {
            pads = 1;
            if (s.charAt(imax - 2) === this.PADCHAR) {
                pads = 2;
            }
            imax -= 4;
        }

        for (i = 0; i < imax; i += 4) {
            // tslint:disable-next-line:no-bitwise
            b10 =
                // tslint:disable-next-line:no-bitwise
                (this.getByte64(s, i) << 18) |
                // tslint:disable-next-line:no-bitwise
                (this.getByte64(s, i + 1) << 12) |
                // tslint:disable-next-line:no-bitwise
                (this.getByte64(s, i + 2) << 6) |
                this.getByte64(s, i + 3);
            // tslint:disable-next-line:no-bitwise
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255));
        }

        switch (pads) {
            case 1:
                // tslint:disable-next-line:no-bitwise
                b10 =
                    // tslint:disable-next-line:no-bitwise
                    (this.getByte64(s, i) << 18) |
                    // tslint:disable-next-line:no-bitwise
                    (this.getByte64(s, i + 1) << 12) |
                    // tslint:disable-next-line:no-bitwise
                    (this.getByte64(s, i + 2) << 6);
                // tslint:disable-next-line:no-bitwise
                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
                break;
            case 2:
                // tslint:disable-next-line:no-bitwise
                b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12);
                // tslint:disable-next-line:no-bitwise
                x.push(String.fromCharCode(b10 >> 16));
                break;
        }

        return x.join('');
    }
    // #########             DECODE THE STRING- BLOCK END             ##############

    // #########             ENCODE THE STRING- BLOCK START             ##############
    // *******PURPOSE: These methods ARE used to ENCODE GIVEN STRING
    // *******CREATED BY: ravi teja.p
    // *******CREATED DATE: 2/6/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    public encode(s: string): string {
        s = String(s);

        // tslint:disable-next-line:prefer-const
        let i: any,
            b10: any,
            // tslint:disable-next-line:prefer-const
            x: any = [],
            // tslint:disable-next-line:prefer-const
            imax = s.length - (s.length % 3);

        if (s.length === 0) {
            return s;
        }

        for (i = 0; i < imax; i += 3) {
            // tslint:disable-next-line:no-bitwise
            b10 =
                // tslint:disable-next-line:no-bitwise
                (this.getByte(s, i) << 16) |
                // tslint:disable-next-line:no-bitwise
                (this.getByte(s, i + 1) << 8) |
                this.getByte(s, i + 2);
            // tslint:disable-next-line:no-bitwise
            x.push(this.ALPHA.charAt(b10 >> 18));
            // tslint:disable-next-line:no-bitwise
            x.push(this.ALPHA.charAt((b10 >> 12) & 63));
            // tslint:disable-next-line:no-bitwise
            x.push(this.ALPHA.charAt((b10 >> 6) & 63));
            // tslint:disable-next-line:no-bitwise
            x.push(this.ALPHA.charAt(b10 & 63));
        }

        switch (s.length - imax) {
            case 1:
                // tslint:disable-next-line:no-bitwise
                b10 = this.getByte(s, i) << 16;
                // tslint:disable-next-line:no-bitwise
                x.push(
                    // tslint:disable-next-line:no-bitwise
                    this.ALPHA.charAt(b10 >> 18) +
                    // tslint:disable-next-line:no-bitwise
                    this.ALPHA.charAt((b10 >> 12) & 63) +
                    this.PADCHAR +
                    this.PADCHAR
                );
                break;
            case 2:
                // tslint:disable-next-line:no-bitwise
                b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8);
                // tslint:disable-next-line:no-bitwise
                x.push(
                    // tslint:disable-next-line:no-bitwise
                    this.ALPHA.charAt(b10 >> 18) +
                    // tslint:disable-next-line:no-bitwise
                    this.ALPHA.charAt((b10 >> 12) & 63) +
                    // tslint:disable-next-line:no-bitwise
                    this.ALPHA.charAt((b10 >> 6) & 63) +
                    this.PADCHAR
                );
                break;
        }

        return x.join('');
    }
    // #########             ENCODE THE STRING- BLOCK END             ##############

    // #########             check error message - BLOCK START             ##############
    // *******PURPOSE: These methods ARE used to check error message from server response
    // *******CREATED BY: ravi teja.p
    // *******CREATED DATE: 2/6/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    isError(responseObject: any) {
        if (
            this.hasValue(responseObject) &&
            this.hasValue(responseObject.length) &&
            responseObject.length > 0
        ) {
            responseObject = responseObject[0];
        }

        // tslint:disable-next-line:radix
        if (
            responseObject !== undefined &&
            responseObject.RequestExecutionStatus !==
            // tslint:disable-next-line:radix
            undefined &&
            // tslint:disable-next-line:radix
            parseInt(responseObject.RequestExecutionStatus) < 0 &&
            // tslint:disable-next-line:radix
            parseInt(responseObject.RequestExecutionStatus) !== -3
        ) {
            if (responseObject.ErrorMessage !== undefined) {
                this.ShowErrorMessage(responseObject.ErrorMessage);
                return true;
            } else {
                // tslint:disable-next-line:max-line-length
                this.ShowErrorMessage(
                    'An Error Occurred While Processing Your Request, Please Contact Support Team for Further Assistance.'
                );
            }

            return true;
        }

        return false;
    }
    // #########             check error message - BLOCK END             ##############

    // #########             SHOW ERROR MESSAGE - BLOCK START             ##############
    // *******PURPOSE: These methods ARE used to show error message
    // *******CREATED BY: ravi teja.p
    // *******CREATED DATE: 2/6/2017
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ShowErrorMessage(requeststring: any) {
        if (this.hasValue(requeststring)) {
            const event = new CustomEvent('showErrorMessage', {
                detail: requeststring
            });
            // Dispatch the event.
            document.dispatchEvent(event);
        }
    }

    ShowSuccesseMessage(requeststring: any) {
        if (this.hasValue(requeststring)) {
            const event = new CustomEvent('ShowSuccesseMessage', {
                detail: requeststring
            });
            // Dispatch the event.
            document.dispatchEvent(event);
        }
    }
    // #########             SHOW ERROR MESSAGE - BLOCK END             ##############
    // *******PURPOSE: This method is used to validate date while the user typing in entry field
    // Example of calling: onkeyup="validateDate(this,event);"
    // *******CREATED BY: George D
    // *******CREATED DATE: 11/19/2014
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    jsIsUserFriendlyCharKeyDown(val: number, step: string | null) {
        // Backspace, Tab, Enter, Insert, and Delete
        if (val === 8 || val === 9 || val === 13 || val === 45 || val === 46) {
            return true;
        }
        // Ctrl, Alt, CapsLock, Home, End, and Arrows
        if ((val > 16 && val < 21) || (val > 34 && val < 41)) {
            return true;
        }
        if (step === 'Decimals') {
            if (val === 190 || val === 110) {
                // Check dot key code should be allowed
                return true;
            }
        }
        // The rest
        return false;
    }

    // validateDate(dateInputBox: { value: string; } | undefined, event: { keyCode: number; }) {
    //     // return;//added by mahesh p since //Do not append Slashes (/) automatically when DOB is entering requirement from client
    //     // tslint:disable-next-line:no-debugger
    //     //debugger;

    //     // this line was added by mahesh p for allowing navigation keys
    //     if (this.jsIsUserFriendlyCharKeyDown(event.keyCode, null)) {
    //         return true;
    //     }

    //     // if (event.keyCode == 8 || event.keyCode == 46) {
    //     //    //allowing backspace and delete keys
    //     //    return true;
    //     // }

    //     if (dateInputBox === undefined) {
    //         return '';
    //     } // if object is undefined then return

    //     let inputValue = dateInputBox.value; // getting date input value from input box

    //     inputValue = inputValue.replace(/[^\d^\/]/g, '');

    //     // tslint:disable-next-line:prefer-const
    //     let dateParts = inputValue.split('/'); // spliting with '/' to get month,date and year seperately

    //     let month = '',
    //         date = '',
    //         year = ''; // initializing variables

    //     // getting month part and do the manipulations
    //     if (dateParts.length > 0) {
    //         // tslint:disable-next-line:radix
    //         if (parseInt(dateParts[0]) > 12) {
    //             month = dateParts[0].substring(0, 1);
    //         } else {
    //             month = dateParts[0];

    //             if (dateParts.length > 1 && month.length === 1) {
    //                 month = '0' + month;
    //             }
    //         }
    //     }

    //     // getting date part and do the manipulations
    //     if (dateParts.length > 1) {
    //         // tslint:disable-next-line:radix
    //         if (parseInt(dateParts[1]) > 31) {
    //             date = dateParts[1].substring(0, 1);
    //         } else {
    //             date = dateParts[1];

    //             if (dateParts.length > 2 && date.length === 1) {
    //                 date = '0' + date;
    //             }
    //         }
    //     }

    //     // getting year part and do the manipulations
    //     if (dateParts.length > 2) {
    //         // tslint:disable-next-line:radix
    //         if (parseInt(dateParts[2]) > 9999) {
    //             year = dateParts[2].substring(0, 4);
    //         } else {
    //             year = dateParts[2];
    //         }
    //     }

    //     let transformedInput = '';

    //     // getting month
    //     if (month.length > 0) {
    //         transformedInput = month;
    //     }

    //     // appending '/' after month
    //     if (month.length === 2 || dateParts.length > 1) {
    //         transformedInput += '/';
    //     }

    //     // getting date
    //     if (date.length > 0) {
    //         transformedInput += date;
    //     }

    //     // appending '/' after date
    //     if (date.length === 2 || dateParts.length > 2) {
    //         transformedInput += '/';
    //     }

    //     // getting year
    //     if (year.length > 0) {
    //         transformedInput += year;
    //     }

    //     // replacing resultant date in entry field
    //     if (transformedInput !== dateInputBox.value) {
    //         dateInputBox.value = transformedInput;
    //     }

    //     // TO AVOID // IN INPUT
    //     if (dateInputBox.value.indexOf('//') >= 0) {
    //         dateInputBox.value = dateInputBox.value.replace(/\/\//g, '/');
    //     }

    //     // added since some times ngmodel is not updating so firing the change event since watcher is fired
    //     $(dateInputBox).trigger('change');
    // }

    validateDateOnLeave(dateInputBox: { value: any; focus: () => void; }) {
        // tslint:disable-next-line:prefer-const
        let d = dateInputBox.value;

        if (!this.hasValue(d)) {
            return true;
        }

        // tslint:disable-next-line:prefer-const
        let validformat = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!validformat.test(d)) {
            this.ShowErrorMessage('Please Enter Date in MM/DD/YYYY Format.');
            dateInputBox.focus();
            return false;
        }
        // const mth = d.split('/')[0];
        // // tslint:disable-next-line:prefer-const
        // let day = d.split('/')[1];
        // const yr = d.split('/')[2];
        // const bday = new Date(yr, mth - 1, day);
        // // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:max-line-length
        // if ((bday.getMonth() + 1 !== mth) || (bday.getDate() !== day) || (bday.getFullYear() !== yr) || bday.getFullYear() < 1900 || bday.getFullYear() > 2099) {
        //     this.ShowErrorMessage('Invalid Day, Month, or Year Range Detected.');
        //     dateInputBox.focus();
        //     return false;
        // }

        return true;
    }
    // *******PURPOSE: This method is used to validate email address while leaving entry field
    // Example of calling: onblur="validateEmail(this);"
    // *******CREATED BY: George D
    // *******CREATED DATE: 11/19/2014
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    validateEmail(emailInputBox: { value: any; focus: () => void; }) {
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

    // *******PURPOSE: This method is used to validate phone number
    // *******CREATED BY: Afroz
    // *******CREATED DATE: 4/23/2015
    // *******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    validatePhoneOnLeave(PhoneInputBox:any) {
        // tslint:disable-next-line:indent
        // tslint:disable-next-line:indent
        // tslint:disable-next-line:indent
        // tslint:disable-next-line:prefer-const
        let EMRPhoneNumberRegEx = /(^1\d{3}|\d{3})-\d{3}-\d{4}$/;
        const d = PhoneInputBox.value;

        if (!this.hasValue(d)) {
            return true;
        }

        // var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!EMRPhoneNumberRegEx.test(d)) {
            this.ShowErrorMessage(
                'Please Enter Valid Phone / Fax Number.<br> Example:111-111-1111 (or)1111-111-1111'
            );
            PhoneInputBox.focus();
            return false;
        }
        if (d.trim().indexOf(0) === '1' && d.trim().replace('-', '').length < 11) {
            this.ShowErrorMessage(
                'Please Enter Valid Phone / Fax Number.<br> Example:111-111-1111 (or)1111-111-1111'
            );
            PhoneInputBox.focus();
            return false;
        }
        if (d.trim().indexOf(0) !== '1' && d.trim().replace('-', '').length < 10) {
            this.ShowErrorMessage(
                'Please Enter Valid Phone / Fax Number.<br> Example:111-111-1111 (or)1111-111-1111'
            );
            PhoneInputBox.focus();
            return false;
        }

        return true;
    }
    setCommonData(storingData: any) {
        const guid = this.adminGetGUID();

        Config.CommonStoredData[guid] = storingData;
        // this.storedData.push({ guid: guid, data: storingData });
        return guid;
    }

    getCommonData(guid: any) {
        const dataInSide = Config.CommonStoredData[guid];
        delete Config.CommonStoredData[guid];
        return dataInSide;
    }

    cloneObject(data:any) {
        return JSON.parse(JSON.stringify(data));
    }

    adminGetCurrentDateTimeFormat(dateString:any) {
        const currentDate = new Date(dateString);
        const year = currentDate.getFullYear();
        let month = (1 + currentDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = currentDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        // get Time
        // tslint:disable-next-line:prefer-const
        let hrs = currentDate.getHours();
        let mins: any = currentDate.getMinutes();

        mins = mins > 9 ? mins : '0' + mins.toString();

        const _time =
            hrs >= 12
                ? (hrs === 12 ? hrs : hrs - 12) + ':' + mins + ' PM'
                : hrs + ':' + mins + ' AM';

        return month + '/' + day + '/' + year + ' ' + _time;
    }

    adminGetCurrentDateFormat(dateString:any) {
        const currentDate = new Date(dateString);
        const year = currentDate.getFullYear();
        let month = (1 + currentDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = currentDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        // get Time
        // tslint:disable-next-line:prefer-const
        let hrs = currentDate.getHours();

        return month + '/' + day + '/' + year;
    }

    adminGetCurrentDateTime() {
        // tslint:disable-next-line:prefer-const
        let dateToReturn = new Date();
        const day =
            (dateToReturn.getDate() < 10 ? '0' : '') + dateToReturn.getDate();
        const month =
            (dateToReturn.getMonth() + 1 < 10 ? '0' : '') +
            (dateToReturn.getMonth() + 1);
        const year = dateToReturn.getFullYear();
        const hours = dateToReturn.getHours();

        // var hours = dateToReturn.getHours();
        const minutes = dateToReturn.getMinutes();

        let newHours, newMinutes;

        if (hours > 11) {
            if (minutes > 9) {
                newMinutes = minutes.toString();
            } else {
                newMinutes = '0' + minutes.toString();
            }
            newMinutes = newMinutes + ' PM';
        } else {
            if (minutes > 9) {
                newMinutes = minutes.toString();
            } else {
                newMinutes = '0' + minutes.toString();
            }
            newMinutes = newMinutes + ' AM';
        }

        if (hours > 12) {
            newHours = hours - 12;
            if (newHours < 10) {
                newHours = '0' + newHours;
            }
        } else {
            newHours = hours.toString();
        }

        return month + '/' + day + '/' + year + ' ' + newHours + ':' + newMinutes;
    }

    adminGetCurrentDate() {
        const dateToReturn = new Date();
        const day =
            (dateToReturn.getDate() < 10 ? '0' : '') + dateToReturn.getDate();
        const month =
            (dateToReturn.getMonth() + 1 < 10 ? '0' : '') +
            (dateToReturn.getMonth() + 1);
        const year = dateToReturn.getFullYear();
        const hours = dateToReturn.getHours();

        // var hours = dateToReturn.getHours();
        const minutes = dateToReturn.getMinutes();

        let newHours, newMinutes;

        if (hours > 11) {
            if (minutes > 9) {
                newMinutes = minutes.toString();
            } else {
                newMinutes = '0' + minutes.toString();
            }
            newMinutes = newMinutes + ' PM';
        } else {
            if (minutes > 9) {
                newMinutes = minutes.toString();
            } else {
                newMinutes = '0' + minutes.toString();
            }
            newMinutes = newMinutes + ' AM';
        }

        if (hours > 12) {
            newHours = hours - 12;
            if (newHours < 10) {
                newHours = '0' + newHours;
            }
        } else {
            newHours = hours.toString();
        }

        return month + '/' + day + '/' + year;
    }
    // added by anusha
    // DateDiff() {
    //     const DateDiff = {
    //         inDaysWithTime: function (d1:any, d2:any) {
    //             d1 = new Date(d1);
    //             d2 = new Date(d2);
    //             const t2 = d2.getTime();
    //             const t1 = d1.getTime();

    //             if (t2 > t1) {
    //                 this.datediff = t2 - t1;
    //                 // tslint:disable-next-line:radix
    //                 return parseInt(this.datediff / (60 * 1000) + (0.5).toFixed());
    //             } else {
    //                 // tslint:disable-next-line:radix
    //                 return -1 * parseInt(this.datediff / (60 * 1000) + (0.5).toFixed());
    //             }
    //         },

    //         inMins: function (d1:any, d2:any) {
    //             let minutes;
    //             const oToday = new Date(d1);
    //             const oDatePublished = new Date(d2);
    //             const nDiff = oToday.getTime() - oDatePublished.getTime();
    //             minutes = Math.floor(nDiff / 1000 / 60);
    //             return minutes;
    //         },
    //         inHours: function (d1:any, d2:any) {
    //             const timeStart = new Date(d1).getTime();
    //             const timeEnd = new Date(d2).getTime();
    //             const hourDiff = timeEnd - timeStart;
    //             return Math.floor(hourDiff / 3600 / 1000);
    //         },

    //         inSeconds: function (d1:any, d2:any) {
    //             const timeStart = new Date(d1).getTime();
    //             const timeEnd = new Date(d2).getTime();
    //             const hourDiff = timeEnd - timeStart;
    //             return hourDiff / 1000 - 60 * 60 * Math.floor(hourDiff / 3600 / 1000);
    //         },
    //         inDays: function (d1:any, d2:any) {
    //             d1 = new Date(new Date(d1).setHours(0, 0, 0, 0));
    //             d2 = new Date(new Date(d2).setHours(0, 0, 0, 0));
    //             const t2 = d2.getTime();
    //             const t1 = d1.getTime();
    //             if (t2 > t1) {
    //                 // tslint:disable-next-line:radix
    //                 return parseInt((t2 - t1) / (24 * 3600 * 1000) + (0.5).toFixed());
    //             } else {
    //                 // tslint:disable-next-line:radix
    //                 return (
    //                     // tslint:disable-next-line:radix
    //                     -1 * parseInt((t1 - t2) / (24 * 3600 * 1000) + (0.5).toFixed())
    //                 );
    //             }
    //         },

    //         // inWeeks: function (d1: string | number | Date, d2: string | number | Date) {
    //         //     d1 = new Date(new Date(d1).setHours(0, 0, 0, 0));
    //         //     d2 = new Date(new Date(d2).setHours(0, 0, 0, 0));

    //         //     const t2 = d2.getTime();
    //         //     const t1 = d1.getTime();

    //         //     if (t2 > t1) {
    //         //         this.datediff = (t2 - t1).toString();
    //         //         // tslint:disable-next-line:radix
    //         //         return parseInt(
    //         //             this.datediff / (24 * 3600 * 1000 * 7) + (0.5).toFixed()
    //         //         );
    //         //     } else {
    //         //         // tslint:disable-next-line:radix
    //         //         return (
    //         //             // tslint:disable-next-line:radix
    //         //             -1 * parseInt((t2 - t1) / (24 * 3600 * 1000 * 7) + (0.5).toFixed())
    //         //         );
    //         //     }
    //         // },

    //         inMonths: function (d1:any, d2:any) {
    //             const d1Y = d1.getFullYear();
    //             const d2Y = d2.getFullYear();
    //             const d1M = d1.getMonth();
    //             const d2M = d2.getMonth();
    //             return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    //         },

    //         inYears: function (d1:any, d2:any) {
    //             return d2.getFullYear() - d1.getFullYear();
    //         }
    //     };
    // }

    grep(elems:any, callback:any, invert:any) {
        let callbackInverse,
            // tslint:disable-next-line:prefer-const
            matches = [],
            i = 0;
        const length = elems.length;
        const callbackExpect = !invert;

        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
            callbackInverse = !callback(elems[i], i);
            if (callbackInverse !== callbackExpect) {
                matches.push(elems[i]);
            }
        }

        return matches;
    }

    isFunction(obj:any) {
        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }
    // toType(obj:any) {
    //     if (obj == null) {
    //         return obj + '';
    //     }

    //     // Support: Android <=2.3 only (functionish RegExp)
    //     return typeof obj === 'object' || typeof obj === 'function'
    //         ? this.class2type[toString.call(obj)] || 'object'
    //         : typeof obj;
    // }

    isWindow(obj:any) {
        return obj != null && obj === obj.window;
    }

    isArrayLike(obj:any) {
        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        const length = !!obj && 'length' in obj && obj.length,
            // tslint:disable-next-line:prefer-const
            type = this.toType(obj);

        if (this.isFunction(obj) || this.isWindow(obj)) {
            return false;
        }

        return (
            type === 'array' ||
            length === 0 ||
            (typeof length === 'number' && length > 0 && length - 1 in obj)
        );
    }
    // arg is for internal usage only
    map(elems:any, callback:any, arg:any) {
        let length,
            value,
            i = 0,
            // tslint:disable-next-line:prefer-const
            ret = [];

        // Go through the array, translating each of the items to their new values
        if (this.isArrayLike(elems)) {
            length = elems.length;
            for (; i < length; i++) {
                value = callback(elems[i], i, arg);

                if (value != null) {
                    ret.push(value);
                }
            }

            // Go through every key on the object,
        } else {
            // tslint:disable-next-line:forin
            for (const iss in elems) {
                value = callback(elems[iss], iss, arg);

                if (value != null) {
                    ret.push(value);
                }
            }
        }

        // Flatten any nested arrays
        return [].concat.apply([], ret);
    }

    unique(results: any) {
        let elem,
            // tslint:disable-next-line:prefer-const
            duplicates = [],
            j = 0,
            i = 0;

        // Unless we *know* we can detect duplicates, assume their presence
        const hasDuplicate = true;
        let sortInput = true && results.slice(0);
        results.sort();

        if (hasDuplicate) {
            while ((elem = results[i++])) {
                if (elem === results[i]) {
                    j = duplicates.push(i);
                }
            }
            while (j--) {
                results.splice(duplicates[j], 1);
            }
        }

        // Clear input after sorting to release objects
        // See https://github.com/jquery/sizzle/pull/225
        sortInput = null;

        return results;
    }

    getAllFieldsWithValuesInCurrentForm(elementToFind: ElementRef) {
        const elementFieldValueToPush: any = {};

        const savingFieldsData = [];

        const elementsFound = elementToFind.nativeElement.querySelectorAll(
            '[fieldid]'
        );

        const elementsFoundLength = elementsFound.length;

        for (let index = 0; index < elementsFoundLength; index++) {
            const elementInLoop = elementsFound[index];

            if (this.hasValue(elementInLoop)) {
                const currentElementName = elementInLoop.getAttribute('name');

                elementFieldValueToPush.FieldID = elementInLoop.getAttribute('fieldid');

                if (elementInLoop.tagName.toString().toLowerCase() === 'input') {
                    const isDatePicker = elementInLoop.getAttribute(
                        'ng-reflect-mat-datepicker'
                    );

                    if (this.hasValue(isDatePicker)) {
                        elementFieldValueToPush.FieldValue = elementInLoop.getAttribute(
                            'ng-reflect-model'
                        );
                        if (this.hasValue(elementFieldValueToPush.FieldValue)) {
                            elementFieldValueToPush.FieldValue = this.adminGetCurrentDateFormat(
                                elementFieldValueToPush.FieldValue
                            );
                        }
                    } else {
                        elementFieldValueToPush.FieldValue = elementInLoop.getAttribute(
                            'ng-reflect-model'
                        );
                    }
                } else if (
                    elementInLoop.tagName.toString().toLowerCase() === 'mat-select'
                ) {
                    elementFieldValueToPush.FieldValue = elementInLoop.getAttribute(
                        'ng-reflect-model'
                    );
                } else {
                    elementFieldValueToPush.FieldValue = elementInLoop.getAttribute(
                        'ng-reflect-model'
                    );
                }

                if (
                    this.hasValue(elementFieldValueToPush.FieldValue) &&
                    this.hasValue(elementFieldValueToPush.FieldID)
                ) {
                    savingFieldsData.push(this.cloneObject(elementFieldValueToPush));
                }
            }
        }

        return savingFieldsData;
    }

    // THIS METHOD IS USEFUL IN STATE GETTING THE STATE MAINTAING DATA TO DISPLAY IT IN GRID , SO FLIPPING THE LIST HORIZONTALLY
    getFilledArrayDataFromEditModeDataForGrid(
        currentFieldGroupdata:any,
        defaultRoWobjecttoClone:any,
        filedAndEnumInfoList:any
    ): Array<any> {
        // tslint:disable-next-line:prefer-const
        let employeeRelationalData = [];

        if (
            this.hasValue(currentFieldGroupdata) &&
            currentFieldGroupdata.length > 0
        ) {
            const uniqueFieldSequences = this.unique(
                this.map(
                    currentFieldGroupdata,
                    function (inItem: { FieldSeqNumber: any; }) {
                        return inItem.FieldSeqNumber;
                    },
                    null
                )
            );

            for (
                let indexInInsideLoop = 0;
                indexInInsideLoop < uniqueFieldSequences.length;
                indexInInsideLoop++
            ) {
                const elementInInsideLoop = uniqueFieldSequences[indexInInsideLoop];

                // tslint:disable-next-line:prefer-const
                let rowtoInsert: any = this.cloneObject(defaultRoWobjecttoClone);

                const currentRowData = this.grep(
                    currentFieldGroupdata,
                    function (itemInsideMe: { FieldSeqNumber: any; }) {
                        return itemInsideMe.FieldSeqNumber === elementInInsideLoop;
                    },
                    null
                );

                for (
                    let indexInMyLoop = 0;
                    indexInMyLoop < currentRowData.length;
                    indexInMyLoop++
                ) {
                    const elementInMyLoop = currentRowData[indexInMyLoop];

                    for (
                        let indexInFieldsList = 0;
                        indexInFieldsList < filedAndEnumInfoList.length;
                        indexInFieldsList++
                    ) {
                        const element = filedAndEnumInfoList[indexInFieldsList];

                        if (elementInMyLoop.FieldID === element.DBFieldID) {
                            // date field type
                            if (element.fieldtype === FieldDataType.DATE) {
                                if (this.hasValue(elementInMyLoop.FieldValue)) {
                                    rowtoInsert[element.localfield] = new Date(
                                        elementInMyLoop.FieldValue
                                    );
                                }
                            } else {
                                rowtoInsert[element.localfield] = elementInMyLoop.FieldValue;
                            }
                            break;
                        }
                    }
                }

                rowtoInsert.FieldSeqNumber = elementInInsideLoop;

                employeeRelationalData.push(this.cloneObject(rowtoInsert));
            }
        }

        return employeeRelationalData;
    }

    // THIS METHOD IS USEFUL IN GETTING THE SAVING DATA TO SAVE IN DATA BASE SO FLIPPING IT VERTICALLY TO SAVE IN DATA BASE
    getAllFieldsWithSequenceForSaving(
        dataList:any,
        elementGroupId:any,
        RecordID:any,
        filedAndEnumInfoList:any
    ): Array<any> {
        const savingFieldsData: any = [];

        if (this.hasValue(dataList) && dataList.length > 0) {
            // looping on all reporting to list
            for (let indexInLoop = 0; indexInLoop < dataList.length; indexInLoop++) {
                // current reporting row
                const elementInLoopReporting = dataList[indexInLoop];

                // getting all keys in current row
                const elementInLoopReportingKeys = Object.keys(elementInLoopReporting);

                // looping on all keys in current row object
                for (
                    let innerindex = 0;
                    innerindex < elementInLoopReportingKeys.length;
                    innerindex++
                ) {
                    const elementFieldValueToPush: any = {};
                    elementFieldValueToPush.FieldGroupID = elementGroupId;
                    elementFieldValueToPush.RecordID = RecordID;

                    // getting the current key column name to assing it to proper field
                    const elementInnerLoop = elementInLoopReportingKeys[innerindex];

                    for (
                        let indexInFieldsList = 0;
                        indexInFieldsList < filedAndEnumInfoList.length;
                        indexInFieldsList++
                    ) {
                        const element = filedAndEnumInfoList[indexInFieldsList];

                        if (elementInnerLoop.toLowerCase() === element.localfield) {
                            if (this.hasValue(elementInLoopReporting[elementInnerLoop])) {
                                elementFieldValueToPush.FieldID = element.DBFieldID;
                                elementFieldValueToPush.FieldSeqNumber =
                                    elementInLoopReporting.FieldSeqNumber;

                                // date field type
                                if (element.fieldtype === FieldDataType.DATE) {
                                    elementFieldValueToPush.FieldValue = this.adminGetCurrentDateFormat(
                                        elementInLoopReporting[elementInnerLoop]
                                    );
                                } else {
                                    elementFieldValueToPush.FieldValue =
                                        elementInLoopReporting[elementInnerLoop];
                                }
                                break;
                            }
                        }
                    }

                    if (
                        this.hasValue(elementFieldValueToPush.FieldValue) &&
                        this.hasValue(elementFieldValueToPush.FieldID) &&
                        this.hasValue(elementFieldValueToPush.FieldValue)
                    ) {
                        savingFieldsData.push(this.cloneObject(elementFieldValueToPush));
                    }
                }
            }
        }

        return savingFieldsData;
    }

    setFieldValueBasedOnElementType(elementFound:any, FieldValue:any, modelObjToUpdate:any) {
        if (this.hasValue(elementFound) && this.hasValue(FieldValue)) {
            const currentElementName = elementFound.getAttribute('name');
            const isDatePicker = elementFound.getAttribute(
                'ng-reflect-mat-datepicker'
            );

            if (
                this.hasValue(currentElementName) &&
                this.hasValue(modelObjToUpdate)
            ) {
                if (elementFound.tagName.toString().toLowerCase() === 'mat-select') {
                    if (elementFound.hasArrtibute('multiple')) {
                        modelObjToUpdate[currentElementName] = FieldValue.toString().split(
                            ','
                        );
                    } else {
                        modelObjToUpdate[currentElementName] = FieldValue;
                    }
                } else if (this.hasValue(isDatePicker)) {
                    modelObjToUpdate[currentElementName] = new Date(FieldValue);
                }
            } else {
                elementFound.value = FieldValue;
                elementFound.setAttribute('ng-reflect-model', FieldValue);
                elementFound.setAttribute('ng-reflect-value', FieldValue);
            }
        }
    }

    getFieldValueBasedOnElementType(elementFound: { getAttribute: (arg0: string) => string; tagName: { toString: () => string; }; hasArrtibute: (arg0: string) => any; }, modelObjToUpdate: { [x: string]: any; }) {
        let FieldValue = '';

        if (this.hasValue(elementFound)) {
            const currentElementName = elementFound.getAttribute('name');
            const isDatePicker = elementFound.getAttribute(
                'ng-reflect-mat-datepicker'
            );

            if (
                this.hasValue(currentElementName) &&
                this.hasValue(modelObjToUpdate)
            ) {
                if (elementFound.tagName.toString().toLowerCase() === 'mat-select') {
                    if (elementFound.hasArrtibute('multiple')) {
                        FieldValue = modelObjToUpdate[currentElementName].join(',');
                    } else {
                        FieldValue = modelObjToUpdate[currentElementName];
                    }
                } else if (this.hasValue(isDatePicker)) {
                    FieldValue = this.adminGetCurrentDateFormat(
                        modelObjToUpdate[currentElementName]
                    );
                }
            } else {
                FieldValue = elementFound.getAttribute('ng-reflect-model');
                FieldValue = elementFound.getAttribute('ng-reflect-value');
            }
        }
    }

    DateDiffInMins(d1: string | number | Date, d2: string | number | Date) {
        let minutes;
        const oToday = new Date(d1);
        const oDatePublished = new Date(d2);
        const nDiff = oToday.getTime() - oDatePublished.getTime();
        minutes = Math.floor(nDiff / 1000 / 60);
        // nDiff -= oResult.minutes * 1000 * 60;
        return minutes;
    }


    /**
 * Returns negative number if d2 is greater than d1
 * positive otherwise
 // tslint:disable-next-line:no-redundant-jsdoc
 * @param d1
 // tslint:disable-next-line:no-redundant-jsdoc
 * @param d2
 * // tslint:disable-next-line:no-redundant-jsdoc
 */
    DateDiffInDays(d1: string | number | Date, d2: string | number | Date) {
        let days;
        const oToday = new Date(d1);
        const oDatePublished = new Date(d2);
        const nDiff = oToday.getTime() - oDatePublished.getTime();
        days = Math.floor(nDiff / 1000 / 60 / 60 / 24);
        return days;
    }

    /**
     * Returns negative number if d2 is greater than d1
     * positive otherwise
    //  // tslint:disable-next-line:no-redundant-jsdoc
    //  * @param d1
    //  // tslint:disable-next-line:no-redundant-jsdoc
    //  // tslint:disable-next-line:no-redundant-jsdoc
    //  * @param d2
    //  */
    // DateDiffInDays(d1, d2) {
    //     let days;
    //     const oToday = new Date(d1);
    //     const oDatePublished = new Date(d2);
    //     const nDiff = oToday.getTime() - oDatePublished.getTime();
    //     days = Math.floor(nDiff / 1000 / 60 / 60 / 24);
    //     return days;
    // }

    /**
     * Check if the html element is selectable
     * @param element element to check
     */
    isSelectableField(element: HTMLElement): boolean {
        return (
            this.isSelectField(element) ||
            this.isDatePickerField(element) ||
            this.isRadioGroup(element)
        );
    }

    /**
     * Check if element is select field
     * @param element element to check
     */
    isSelectField(element: HTMLElement): boolean {
        return element.tagName.toString().toLowerCase() === 'mat-select';
    }

    /**
     * Check if element is date picker element
     * @param element element to check
     */
    isDatePickerField(element: HTMLElement): boolean {
        return (
            this.hasValue(element.getAttribute('ng-reflect-mat-datepicker')) ||
            element.hasAttribute('date-picker-field')
        );
    }

    isRadioGroup(element: HTMLElement): boolean {
        return element.tagName === 'mat-radio-group';
    }

    /**
     *
     *
     */
    getAllFieldsWithValuesInCurrentFormInModel(
        elementToFind: ElementRef,
        model: any
    ) {
        const elementFieldValueToPush: any = {};

        const savingFieldsData = [];

        const elementsFound = elementToFind.nativeElement.querySelectorAll(
            '[fieldid]'
        );

        const elementsFoundLength = elementsFound.length;

        for (let index = 0; index < elementsFoundLength; index++) {
            const elementInLoop = elementsFound[index];

            if (this.hasValue(elementInLoop)) {
                const currentElementName = elementInLoop.getAttribute('name');

                elementFieldValueToPush.FieldID = elementInLoop.getAttribute('fieldid');

                if (elementInLoop.tagName.toString().toLowerCase() === 'input') {
                    const isDatePicker = elementInLoop.getAttribute(
                        'ng-reflect-mat-datepicker'
                    );

                    if (this.hasValue(isDatePicker)) {
                        elementFieldValueToPush.FieldValue = model[currentElementName];
                        if (this.hasValue(elementFieldValueToPush.FieldValue)) {
                            elementFieldValueToPush.FieldValue = this.adminGetCurrentDateFormat(
                                elementFieldValueToPush.FieldValue
                            );
                        }
                    } else {
                        elementFieldValueToPush.FieldValue = model[currentElementName];
                    }
                } else if (
                    elementInLoop.tagName.toString().toLowerCase() === 'mat-select'
                ) {
                    elementFieldValueToPush.FieldValue = model[currentElementName];
                } else {
                    elementFieldValueToPush.FieldValue = model[currentElementName];
                }

                if (this.hasValue(elementFieldValueToPush.FieldID)) {
                    savingFieldsData.push(this.cloneObject(elementFieldValueToPush));
                }
            }
        }

        return savingFieldsData;
    }

    saveFormFieldsInModel(element: ElementRef, model: any, RecordID: number) {
        const elements: NodeList = element.nativeElement.querySelectorAll(
            '[fieldid]'
        );

        let validationExists = false;
        let validationFieldID = 0;
        let validationFieldGroupID = 0;
        let validationMessage = '';

        const dataToSave = [];
        for (let index = 0; index < elements.length; index += 1) {
            const elementFieldValueToPush: any = {};

            const currentElement: HTMLElement = elements[index] as HTMLElement;
            const currentElementGroupId: any = currentElement.getAttribute(
                'fieldgroupid'
            );
            const currentElementName:any = currentElement.getAttribute('name');

            if (this.hasValue(currentElementGroupId)) {
                elementFieldValueToPush.FieldID = currentElement.getAttribute(
                    'fieldid'
                );
                elementFieldValueToPush.FieldGroupID = currentElementGroupId;
                elementFieldValueToPush.FieldSeqNumber = currentElementGroupId;
                elementFieldValueToPush.RecordID = RecordID;

                if (currentElement.tagName.toString().toLowerCase() === 'input') {
                    if (this.isDatePickerField(currentElement)) {
                        elementFieldValueToPush.FieldValue = model[currentElementName];

                        if (this.hasValue(elementFieldValueToPush.FieldValue)) {
                            elementFieldValueToPush.FieldValue = this.adminGetCurrentDateFormat(
                                elementFieldValueToPush.FieldValue
                            );
                        }
                    } else {
                        elementFieldValueToPush.FieldValue = model[currentElementName];
                    }
                } else {
                    elementFieldValueToPush.FieldValue = model[currentElementName];
                }

                if (
                    this.hasValue(elementFieldValueToPush.FieldValue) &&
                    this.hasValue(elementFieldValueToPush.FieldValue.trim())
                ) {
                    dataToSave.push(this.cloneObject(elementFieldValueToPush));
                } else {
                    const isElementMandatory = currentElement.getAttribute('ismandatory');

                    if (this.hasValue(isElementMandatory) && isElementMandatory === '1') {
                        validationExists = true;
                        validationFieldID = elementFieldValueToPush.FieldID;
                        validationFieldGroupID = elementFieldValueToPush.FieldGroupID;
                        if (this.isSelectableField(currentElement)) {
                            validationMessage =
                                `Please Select ` + currentElement.getAttribute('placeholder');
                        } else {
                            validationMessage =
                                `Please Enter ` + currentElement.getAttribute('placeholder');
                        }
                        break;
                    }
                }
            }
        }

        return {
            validationExists,
            dataToSave,
            validationMessage,
            FieldID: validationFieldID,
            FieldGroupID: validationFieldGroupID
        };
    }

    /**
     * To add '-' automatically to the phonenumber field
     * @author Sanjay Idpuganti
     * @param phoneNumberField The mobile number input element
     */
    public autoFormatPhoneNumber(
        phoneNumberField: HTMLInputElement,
        event: { key: string; }
    ): void {
        const validPhoneNumberCharacters = '1234567890-';

        // if the phone number field contains any other character other than digits do not format
        if (
            !Array.from(phoneNumberField.value).every(x =>
                validPhoneNumberCharacters.includes(x)
            )
        ) {
            return;
        }

        if (validPhoneNumberCharacters.includes(event.key)) {
            const phoneNumber: string = phoneNumberField.value.trim();

            const phoneNumberLength: number = phoneNumber.length;
            if (phoneNumber.charAt(0) === '1') {
                phoneNumberField.maxLength = 13;
                if (phoneNumberLength === 4 || phoneNumberLength === 8) {
                    phoneNumberField.value = phoneNumber + '-';
                }
            } else {
                phoneNumberField.maxLength = 12;
                if (phoneNumberLength === 3 || phoneNumberLength === 7) {
                    phoneNumberField.value = phoneNumber + '-';
                }
            }
        }
    }

    //CellRenderer Component for DateTimeFormat for the Grids
    dateTimeFormatCellRenderer(params: { value: string | number | Date; context: { componentParent: { formatDateTime: (arg0: string, arg1: string) => any; }; }; }) {
        // var date = new Date(params.value + ' UTC');
        var date = new Date(params.value);
        //params.context.componentParent - parent component of the Grid
        return (params.context.componentParent.formatDateTime(date.toString(), 'MM/dd/yyyy hh:mm tt'));
    }

    //CellRenderer Component for DateTimeFormat for the Grids
    newdateTimeFormatCellRenderer(params: { value: string | number | Date; context: { componentParent: { formatDateTime: (arg0: string, arg1: string) => any; }; }; }) {
        var date = new Date(params.value);
        //params.context.componentParent - parent component of the Grid
        return (params.context.componentParent.formatDateTime(date.toString(), 'MM/dd/yyyy hh:mm tt'));
    }

    //to convert DateTime to given format 
    formatDateTime =  (inputDate:any, format:any) => {
        if (format === void 0) { format = "yyyy-MM-dd"; }
        if (inputDate == null || inputDate == "")
            return "";
        try {
            var date = new Date(inputDate);
            if (format == "yyyy-MM-dd")
                return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
            else if (format == "MM/dd/yyyy")
                return ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear();
            else if (format == "MM/dd/yyyy hh:mm tt")
                return ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear() +
                    " " + this.formatAMPM(date);
            else
                return "";
        }
        catch (e) {
            if (inputDate.length > 9)
                return inputDate.substring(5, 7) + "/" + inputDate.substring(8, 10) + "/" + inputDate.substring(0, 4);
            else
                return "";
        }
    };
    formatAMPM = function (date: { getHours: () => any; getMinutes: () => any; }) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };
}


export const FieldDataType: any = {
    INTEGER: 1,
    DATE: 2,
    DATETIME: 3,
    BOOLEAN: 4,
    STRING: 5,
    DOUBLE: 6,
    FLOAT: 7,
    LONG: 8,
    GOOGLECLOUDHTML: 9 // need to send in base64 format
};

export const HistoryDescType: any = {
    CommentCreated: 'Comment Created',
    CommentUpdated: 'Comment Changed',
    TaskCreated: 'Task Created',
    Observers: 'Observers',
    ResponsiblePersonChange: 'Responsible Person Changed',
    Status: 'Status Updated',
    TaskUpdated: 'Task Updated'
};

export const ReposneContentTypes: any = {
    HTML: 'text/html',
    JSON: 'application/JSON',
    PLAINTEXT: 'text/plain',
    ZIPPEDBINARY: 'arraybuffer'
};

import { ElementRef, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { root } from 'rxjs/internal/util/root';
import { Config } from './config';

@Pipe({ name: 'SafeHtml' })
export class Safe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url: string | SafeValue | null) {
        //  return this.sanitizer.bypassSecurityTrustHtml(url);
        return this.sanitizer.sanitize(SecurityContext.HTML, url);
    }
}
