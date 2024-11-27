import { ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
  static match(controlName: string, matchingControlName: string, errorName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;

      if (!(formGroup instanceof FormGroup)) {
        return null;
      }

      const firstControl = formGroup.get(controlName);
      const secondControl = formGroup.get(matchingControlName);

      if (secondControl?.errors && !secondControl.errors[errorName]) {
        return null;
      }

      if (firstControl?.value !== secondControl?.value) {
        secondControl?.setErrors({ [errorName]: true });
        return { [errorName]: true };
      } else {
        secondControl?.setErrors(null);
        return null;
      }
    };
  }
}
