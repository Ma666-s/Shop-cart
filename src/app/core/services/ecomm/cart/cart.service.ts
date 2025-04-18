import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private httpClient: HttpClient = inject(HttpClient)
  userhead : any = {token : localStorage.getItem('userToken')}
  constructor() { }

  addToCart(pId:string):Observable<any>
  {
    return this.httpClient.post(`${Env.baseUrl}/api/v1/cart`, {productId : pId})
  }
  updateCart(pId:string,pCount:number):Observable<any>
  {
    return this.httpClient.put(`${Env.baseUrl}/api/v1/cart/${pId}`, {count : pCount})
  }
  getUserCart():Observable<any>
  {
    return this.httpClient.get(`${Env.baseUrl}/api/v1/cart`)
  }
  deleteCart(pId:string):Observable<any>
  {
    return this.httpClient.delete(`${Env.baseUrl}/api/v1/cart/${pId}`)
  }
  clearAllCart():Observable<any>
  {
    return this.httpClient.delete(`${Env.baseUrl}/api/v1/cart`)
  }
}
