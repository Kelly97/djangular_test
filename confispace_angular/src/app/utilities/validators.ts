import {
    AbstractControl,
    ValidatorFn,
    FormControl,
    FormGroup
} from '@angular/forms';

export class CustomValidators {
    constructor() { }

    static passwordRegex:string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$";
    static mailRegex:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    static onlyChar(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value == '') return null;

            let re = new RegExp('^[a-zA-Z ]*$');
            if (re.test(control.value)) {
                return null;
            } else {
                return { onlyChar: true };
            }
        };
    }

    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
            return null;
        };
    }
}