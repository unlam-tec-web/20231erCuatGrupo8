import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchValidator } from '../signup/password-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
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
        // Si responde ok la petición
        next: (res: any) => {
          alert('Inició sesión!');
          this.router.navigate(['/']);
        },
        // Si hay error en la petición
        error: (err: any) => { alert('El email ya existe. Debe utilizar otro') },
        // complete: () => { }
      }
    )

    this.loading = false; // Anula spinner
  }
}
