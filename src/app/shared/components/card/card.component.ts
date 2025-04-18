import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/ecomm/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cardProduct !: Product
  private cartService: CartService = inject(CartService)
  private toasterService: ToastrService = inject(ToastrService)
  
 
  // rating stars
  getStars() {
    const fullStars = Math.floor(this.cardProduct.ratingsAverage);
    const halfStar = this.cardProduct.ratingsAverage % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return {
      full: Array(fullStars).fill('★'),
      half: Array(halfStar).fill('★½'),
      empty: Array(emptyStars).fill('☆')
    };
  }

  // add to cart
  addToCart(pId:string)
  {
    this.cartService.addToCart(pId).subscribe({
      next:(res)=>{this.toasterService.success(res.message, "Shop Cart")
      }
    })
  }

}
