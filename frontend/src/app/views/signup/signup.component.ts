import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchValidator } from './password-match.validator';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public formSignUp: FormGroup;
  public md5: any = new Md5();

  constructor(
    private fb: FormBuilder,
    private router: Router,  
    private toastr: ToastrService, 
    private _userService: UserService
  ) {
    this.formSignUp = this.fb.group({
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

  ngOnInit(): void { }


  createUser() {
    //Obtengo los datos del form
    const USER: User = {
      email: this.formSignUp.get('email')?.value,
      password: this.md5.appendStr(this.formSignUp.get('password')?.value).end(),
      firstName: this.formSignUp.get('description')?.value,
      lastName: this.formSignUp.get('category')?.value,
      address: this.formSignUp.get('price')?.value,
    }

    //guardo el usuario en la bd
    this._userService.saveUser(USER).subscribe(data => {
      this.toastr.success('Felicitaciones!', 'Se registro correctamente'); //cartel exito
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.formSignUp.reset();
    });


  }


}







/* CODIGO GABY

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formSignUp!: FormGroup;
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
        error: (err: any) => { alert('El email ya existe. Debe utilizar otro') },
        // complete: () => { }
      }
    )

    // setTimeout(() => this.loading == false, 2000)
    this.loading = false; // Anula spinner
  }
}



*/