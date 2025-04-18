import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/ecomm/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CartService } from '../../../core/services/ecomm/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  activatedRoute = inject(ActivatedRoute)
  productService = inject(ProductService)
  @Input() cardProduct !: Product
  private toasterService: ToastrService = inject(ToastrService)
  pId : string|null = ''
  pDetails !: Product

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((param)=>{
   this.pId = param.get('pDid')
   
   this.productService.getSpecProduct(this.pId).subscribe({
    next:(res)=>{
      this.pDetails = res.data
      
    }
   })
   
  })
  }

  addToCart(pId:string)
  {
    this.productService.addToCart(pId).subscribe({
      next:(res)=>{this.toasterService.success(res.message, 'Shop Cart')
      
      }
    })
  }

  getStars() {
    const fullStars = Math.floor(this.pDetails.ratingsAverage);
    const halfStar = this.pDetails.ratingsAverage % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return {
      full: Array(fullStars).fill('★'),
      half: Array(halfStar).fill('★½'),
      empty: Array(emptyStars).fill('☆')
    };
  }
}
