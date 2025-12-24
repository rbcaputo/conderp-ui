import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passwordControlA: string, passwordControlB: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    if (formGroup.get(passwordControlA)?.value !== formGroup.get(passwordControlB)?.value) {
      formGroup.get(passwordControlB)?.setErrors({ passwordMismatch: true });

      return { passwordMismatch: true };
    }

    // Clear if match and previously had error.
    if (formGroup.get(passwordControlB)?.hasError('passwordMismatch'))
      formGroup.get(passwordControlB)?.setErrors(null);

    return null;
  };
}
