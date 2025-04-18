import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Env } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpclient = inject(HttpClient)
  userhead : any = {token : localStorage.getItem('userToken')}
  private products$: Observable<any> | undefined;

  constructor() { }

  getAllProducts(): Observable<any> {
    if (!this.products$) {
      this.products$ = this.httpclient.get(`${Env.baseUrl}/api/v1/products`).pipe(
        shareReplay(1) // Cache the last emitted value
      );
    }
    return this.products$;
  }
  getSpecProduct(pId:string|null):Observable<any>
  {
    return this.httpclient.get(`${Env.baseUrl}/api/v1/products/${pId}`)
  }
  addToCart(pId:string):Observable<any>
  {
    return this.httpclient.post(`${Env.baseUrl}/api/v1/cart`, {productId : pId})
  }
  getSpecProductsPrice(pPrice:string):Observable<any>
  {
    return this.httpclient.get(`${Env.baseUrl}/api/v1/products?price[gte]=${pPrice}`)
  }
}
