import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { userDTO } from '../dtos/user-dto';
import { UiHelperService } from '../services/ui-helper.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  isLoggedIn:WritableSignal<boolean> = signal(false)
  user:WritableSignal<userDTO | null> = signal(null)
  constructor(private authService:AuthService,private uiHelper:UiHelperService){
    effect(() => {
      const currentUser = this.authService.current_user();
      this.isLoggedIn.set(currentUser !== null);
      this.user.set(currentUser);
    });
  }


  onLogOut(){
    this.uiHelper.removeParam('auth_user')
    this.authService.current_user.update(prevState => null)
  }
}
