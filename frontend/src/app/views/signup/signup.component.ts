import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchValidator } from './password-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formSignUp!: FormGroup;
  wasSubmitted: boolean = false; // Flag para saber si el usuario envió el formulario
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Regex contraseña: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$
    // 1 minúscula -> (?=.*[a-z])
    // 1 mayuscula -> (?=.*[A-Z])
    // 1 dígito -> (?=.*\d)
    // Mínimo 8 caracteres -> (?=^.{8,}$)
    // No permite espacios en blanco

    this.formSignUp = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/)]),
      passwordConfirm: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    },
    { validators: PasswordMatchValidator('password', 'passwordConfirm') } as AbstractControlOptions
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
          alert('Registro exitoso. Verifique el mail para iniciar sesión.');
          this.router.navigate(['/']);
        },
        // Si hay error en la petición
        error: (err: any) => { alert('El email ya existe. Debe utilizar otro')},
        // complete: () => { }
      }
    )

    this.loading = false; // Anula spinner
  }
}
