import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts: Product[], searchWord: string): Product[] {
    return allProducts.filter(ele=>ele.title.toLowerCase().includes(searchWord.toLowerCase()))
  }

}
