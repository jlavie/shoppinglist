import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let requestToSend = req;

  if(token) {
    console.log(token)
    requestToSend = req.clone({
      setHeaders: { Authorization: token }
    });
  }
  return next(requestToSend);
};
