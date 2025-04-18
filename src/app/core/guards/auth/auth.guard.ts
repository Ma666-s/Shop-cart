import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../services/platform/platform.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let platform = inject(PlatformService)
  
  if(platform.checkPlatForm())
  {
    if(localStorage.getItem('userToken') != null)
      {
        return true;
      }
  }

  router.navigate(['/login'])
  return false
};
