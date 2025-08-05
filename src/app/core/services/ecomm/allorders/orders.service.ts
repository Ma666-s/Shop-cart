import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private httpClient : HttpClient = inject(HttpClient)
  userhead : any = {token : localStorage.getItem('userToken')}
   currentUrl = window.location.origin;

  constructor() { }

  checkOut(cartId:string, addressFormValue:any):Observable<any>
  {
    return this.httpClient.post(`${Env.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${this.currentUrl}`, {shippingAddress:addressFormValue},
      {headers: this.userhead}
    )
  }
  getAllOrders():Observable<any>
  {
    return this.httpClient.get(`${Env.baseUrl}/api/v1/orders/`)
  }
}
