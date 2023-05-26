import { FormGroup } from '@angular/forms'

// Validador para coincidencia de contraseñas(controla que 2 campos del form group sean iguales)
export function PasswordMatchValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[controlName];
    const passwordConfirm = formGroup.controls[matchingControlName];
    if (passwordConfirm.errors && !passwordConfirm.errors['passwordMatchValidator']) {
      return;
    }
    if (password.value !== passwordConfirm.value) {
      passwordConfirm.setErrors({ passwordMatchValidator: true });
    } else {
      passwordConfirm.setErrors(null);
    }
  }
}
