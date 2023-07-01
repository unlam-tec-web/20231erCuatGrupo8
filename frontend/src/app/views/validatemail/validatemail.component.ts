import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validatemail',
  templateUrl: './validatemail.component.html',
  styleUrls: ['./validatemail.component.css']
})
export class ValidatemailComponent {
  formValidateMail!: FormGroup;
  validating: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { 
    this.formValidateMail = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      code: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.formValidateMail.valid) {
      return
    }
    this.validating = true

    this.authService.validateEmail(this.formValidateMail.value).subscribe(
      {
        next: (res: any) => {
          this.toastr.success("Email validado, ya puede iniciar sesión");
          this.router.navigate(['/ingreso']);
          this.validating = false
        },
        error: (err: any) => {
          this.toastr.error(err.error.error);
          this.validating = false
        },
      })
  }

}
