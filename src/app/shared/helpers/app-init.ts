import { ActivatedRoute, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { userDTO } from "../dtos/user-dto"
import { inject, InjectionToken } from "@angular/core";


export function AppInit(): () => Promise<void> {
  return () => {
    const auth = inject(AuthService);
    return new Promise<void>((resolve) => {
      const userToken: userDTO | null = auth.getUser() as userDTO;
      if (userToken) {
        auth.current_user.set(userToken);
      }
      resolve();
    });
  };
}









