import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
 // Check for browser environment and localStorage availability
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('userToken');
    
    // Only add headers if token exists
    if (token) {
      // Create proper headers object
      let userhead : any = {token : localStorage.getItem('userToken')}

     
      // Clone request with new headers
      req = req.clone({ setHeaders: userhead });
    }
  }
  
  return next(req);
};