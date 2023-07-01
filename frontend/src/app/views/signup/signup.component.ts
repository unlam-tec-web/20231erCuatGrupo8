import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchValidator } from './password-match.validator';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public formSignUp: FormGroup;
  public md5: any = new Md5();
  validating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService
  ) {
    this.formSignUp = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\^$*.[\]{}()\?\-"!@#%&/\\,><':;\|_~`+=])[^\s](?=.*[^\s])[\S\s]{8,}$/)]),
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
    this.validating = true;
    //Obtengo los datos del form
    const USER: User = {
      email: this.formSignUp.get('email')?.value,
      password: this.formSignUp.get('password')?.value,
      firstName: this.formSignUp.get('firstName')?.value,
      lastName: this.formSignUp.get('lastName')?.value,
      address: this.formSignUp.get('address')?.value,
    }

    //guardo el usuario en la bd
    this._userService.saveUser(USER).subscribe(data => {
      this.toastr.success('Felicitaciones!', 'Se registro correctamente, debe verificar su email'); //cartel exito
      this.router.navigate(['/validaremail']);
      this.validating = false;
    }, error => {
      console.log(error);
      this.toastr.error('Ups!', 'Ocurrio un error');
      this.formSignUp.reset();
      this.validating = false;
    });
  }
}
