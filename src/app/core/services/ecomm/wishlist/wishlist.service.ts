import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private httpClient:HttpClient = inject(HttpClient)
  userhead : any = {token : localStorage.getItem('userToken')}


  constructor() { }

  addProductToWishlist(pId:string):Observable<any>
  {
    return this.httpClient.post(`${Env.baseUrl}/api/v1/wishlist`, {productId :pId }, {headers: this.userhead})
  }
}
