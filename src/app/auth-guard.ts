import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(AuthService);
  const router = inject(Router);
  
  // example required role
  const requireRole: string[] = ["admin", "chef", "manager"];

  // 1) Not logged in -> send to login with returnUrl
  if(!auth.isLoggedIn()){
    return router.createUrlTree(['/login-34389792'], {queryParams: {returnUrl: state.url}}); // ?returnUrl=/orginalPath
  }

  // 2) Logged in but lacks role -> send 403 page
  if(!auth.hasAnyRole(requireRole)) {
    return router.createUrlTree(['/access-denied']);
  }

  // 3) Authroised -> allow through
  return true;
};
