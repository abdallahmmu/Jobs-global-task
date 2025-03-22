import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiHelperService } from '../../../shared/services/ui-helper.service';
import { Router } from '@angular/router';
import { userDTO } from '../../../shared/dtos/user-dto';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private UiHelper: UiHelperService, private router: Router) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.registerForm = new FormGroup({
      emailOrPhone: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.UiHelper.toastrError('Invalid Data', 'Error');
      this.registerForm.markAllAsTouched();
      return;
    }

    const accounts: userDTO[] =
      (this.UiHelper.getParam('accounts') as userDTO[]) || [];

    const findUser = accounts.findIndex(
      (user) => user.emailOrPhone === this.registerForm.value.emailOrPhone
    );

    if (findUser !== -1) {
      this.UiHelper.toastrError('Account is already exsist', 'Error');
      return;
    }

    const newAccount = {
      ...this.registerForm.value,
      id:Math.floor(Math.random() * 255)
    }
    accounts.push(newAccount)

    this.UiHelper.setParam('accounts',accounts)
    this.UiHelper.setParam('auth_user',newAccount)
    this.UiHelper.toastrSuccess('Your Account has been Register','Successfully')
    this.router.navigate(['/'])
  }
}
