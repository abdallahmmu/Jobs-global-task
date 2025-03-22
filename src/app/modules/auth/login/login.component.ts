import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiHelperService } from '../../../shared/services/ui-helper.service';
import { userDTO } from '../../../shared/dtos/user-dto';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup

  constructor(private UiHelper:UiHelperService,private router:Router,private authService:AuthService){}
  
  ngOnInit(): void {
    this.initLoginForm()
  }

  private initLoginForm(){
    this.loginForm = new FormGroup({
      emailOrPhone:new FormControl('',[Validators.required]),
      password:new FormControl('',Validators.required)
    })
  }


  onLogin(){
    if(this.loginForm.invalid){
      this.UiHelper.toastrError('Invalid Data',"Error")
      this.loginForm.markAllAsTouched()
      return
    }


    const accounts: userDTO[]  = this.UiHelper.getParam('accounts') as userDTO[] || []

    const findUser = accounts.findIndex(user => user.password === this.loginForm.value.password)

    if(findUser === -1){
      this.UiHelper.toastrError('Wrong email or password','Error')
      return;
    }
    
    
    this.UiHelper.setParam('auth_user',accounts[findUser])
    this.authService.current_user.update(prev => {
      return {
        ...accounts[findUser]
      }
    })
    this.UiHelper.toastrSuccess('You Have Been LoggedIn','Successfully')
    this.router.navigate(['/'])

  }

}
