import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchValidator } from '../signup/password-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  formSignUp!: FormGroup;
  validating: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    // Longitud mínima de caracteres 8
    // Contiene al menos 1 número
    // Contiene al menos una letra minúscula
    // Contiene al menos una letra mayúscula
    // Contiene al menos 1 carácter especial del siguiente conjunto o un carácter de espacio que no es inicial ni final
    this.formSignUp = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    }

    );
  }

  onSubmit() {
    if (!this.formSignUp.valid) {
      return
    }
    this.validating = true

    this.authService.signUp(this.formSignUp.value).subscribe(
      {
        next: (res: any) => {
          localStorage.setItem('email', res.email)
          localStorage.setItem('usuarme', res.nombre)
          this.toastr.success(`Sesion iniciada`);
          this.router.navigate(['/']);
          setTimeout(() => {
            location.reload()
            this.validating = false;
          }, 1500)
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(err.error.error);
            this.validating = false;
        },
      }
    )
  }
}
