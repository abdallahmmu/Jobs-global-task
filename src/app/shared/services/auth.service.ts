import { Injectable, signal, WritableSignal } from '@angular/core';
import { UiHelperService } from './ui-helper.service';
import { userDTO } from '../dtos/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  current_user:WritableSignal<userDTO | null> = signal(null)
  constructor(private uiHelper:UiHelperService) { }


  getUser() {
    return this.uiHelper.getParam('auth_user')
  }

  setUser(user:userDTO) {
    return this.uiHelper.setParam('auth_user',user)
  }

  isAuthenticated() {
    let token = this.getUser();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
