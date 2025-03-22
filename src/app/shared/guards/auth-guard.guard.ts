import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UiHelperService } from '../services/ui-helper.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const uiHelper = inject(UiHelperService)
  if(authService.current_user() !== null){
    router.navigate(['/'])
    return false
  }
  return true;
};
