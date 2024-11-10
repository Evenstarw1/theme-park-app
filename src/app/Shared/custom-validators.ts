import { ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
  static match(controlName: string, matchingControlName: string, errorName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup; // Convertimos el control en un FormGroup

      if (!(formGroup instanceof FormGroup)) {
        // Si no es un FormGroup, retornamos null
        return null;
      }

      const firstControl = formGroup.get(controlName);  // Renombramos para evitar duplicidad de 'control'
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
