import { Component, inject, Input, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/ecomm/brands/brand.service';
import { Brands } from '../../interfaces/brands';
import { WishlistService } from '../../../core/services/ecomm/wishlist/wishlist.service';

@Component({
  selector: 'app-card-brand',
  imports: [],
  templateUrl: './card-brand.component.html',
  styleUrl: './card-brand.component.css'
})
export class CardBrandComponent{

  private brandService : BrandService = inject(BrandService)
  private wishlistService : WishlistService = inject(WishlistService)
  @Input() brands !: Brands
  constructor(){}
  
  addToWishlist(pId:string)
  {
    this.wishlistService.addProductToWishlist(pId).subscribe({
      next:(res)=>{console.log(res);
      }
    })
  }
}
