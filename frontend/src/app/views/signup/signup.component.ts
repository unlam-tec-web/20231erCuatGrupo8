import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formSignUp!: FormGroup;
  wasSubmitted: boolean = false; // Flag para saber si el usuario envió el formulario

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formSignUp = this.formBuilder.group({
      email: new FormControl('',  [Validators.email, Validators.required]),
      password: new FormControl('',  Validators.required),
      passwordConfirm: new FormControl('',  Validators.required),
      firstName: new FormControl('',  Validators.required),
      lastName: new FormControl('',  Validators.required),
      address: new FormControl('',  Validators.required),
    });
  }

  onSubmit() {
    this.wasSubmitted = true;

    if(this.formSignUp?.valid) {
      // TODO: Inyectar servicio de SignUp y validar contra backend si devuelve 200 OK mostrar mensaje sino throw exception/error
      console.log("Registro exitoso");
    }
  }
}
