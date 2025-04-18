import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private httpClient = inject(HttpClient)

  constructor() { }

  getAllCategories():Observable<any>
  {
    return this.httpClient.get(`${Env.baseUrl}/api/v1/categories`)
  }
}
