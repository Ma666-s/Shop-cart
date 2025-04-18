import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Env } from '../../Environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<any> = new BehaviorSubject(null);
  private httpClient = inject(HttpClient)
  constructor() { 
    afterNextRender(()=>{this.isloggedInUser()})
  }

  sendDataUserRegisterToApi(bodyData:object):Observable<any>
  {
    return this.httpClient.post(`${Env.baseUrl}/api/v1/auth/signup`, bodyData)
  }
  sendDataUserLoginToApi(bodyData:object):Observable<any>
  {
    return this.httpClient.post(`${Env.baseUrl}/api/v1/auth/signin`, bodyData)
  }
  forgetPasswordApi(bodyData:object):Observable<any>
  {
    return this.httpClient.post(`${Env.baseUrl}/api/v1/auth/forgotPasswords`, bodyData)
  }
  resetCodeApi(bodyData:object):Observable<any>
  {
    return this.httpClient.post(`${Env.baseUrl}/api/v1/auth/verifyResetCode`, bodyData)
  }
  resetNewPasswordApi(bodyData:object):Observable<any>
  {
    return this.httpClient.put(`${Env.baseUrl}/api/v1/auth/resetPassword`, bodyData)
  }
  sendDataToken()
  {
    this.userData.next( jwtDecode(JSON.stringify(localStorage.getItem('userToken'))))
  }
  isloggedInUser() : boolean
  {
    if(localStorage.getItem('userToken'))
    {
      this.userData.next( jwtDecode(JSON.stringify(localStorage.getItem('userToken'))))
      return true
    }else
    {
      return false
    }
  }
}


