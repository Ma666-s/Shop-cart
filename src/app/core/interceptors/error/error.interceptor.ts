import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toasterService : ToastrService = inject(ToastrService)
  return next(req).pipe(catchError((err)=>{
    toasterService.error(err.error.message, 'Error Message')
    return throwError(()=>{err})
  }))
};
