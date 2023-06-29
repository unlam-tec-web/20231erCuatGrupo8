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
  wasSubmitted: boolean = false; // Flag para saber si el usuario envió el formulario
  loading: boolean = false;

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
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\^$*.[\]{}()\?\-"!@#%&/\\,><':;\|_~`+=])[^\s](?=.*[^\s])[\S\s]{8,}$/)]),
    }

    );
  }

  onSubmit() {
    this.wasSubmitted = true;

    if (!this.formSignUp.valid) {
      return
    }

    this.loading = true // Para anular el boton y mostrar efecto de enviar la petición

    // Suscribe a la respuesta de la petición del servicio
    // https://rxjs.dev/guide/observable
    this.authService.signUp(this.formSignUp.value).subscribe(
      {
        next: (res: any) => {
          this.authService.isLog = of(true);
          this.toastr.success(`Sesion iniciada`);
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.toastr.error('Debe confirmar el mail');
        },
        // complete: () => { }
      }
    )

    this.loading = false; // Anula spinner
  }
}
