import {  ToastrService } from 'ngx-toastr';
import { CartService } from './../../../core/services/ecomm/cart/cart.service';
import { Component, inject } from '@angular/core';
import { CartProducts } from '../../../shared/interfaces/cart-products';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private cartService: CartService = inject(CartService)
  private toasterService: ToastrService = inject(ToastrService)
  cartId : string = ''
  totalPrice : number = 0
  cartProducts : CartProducts[] = []
  
  ngOnInit(): void {
    this.getMyCart()
  }
  getMyCart()
  {
    this.cartService.getUserCart().subscribe({
      next:(res)=>{this.cartProducts = res.data.products
        this.totalPrice = res.data.totalCartPrice
        this.cartId = res.cartId
      }
    })
  }
  removeProduct(pId:string)
  {
    this.cartService.deleteCart(pId).subscribe({
      next:(res)=> {
        if(res.status == 'success')
        {
          this.toasterService.success("Product deleted succesfully", "Shop Cart")
          this.getMyCart()
        }
      }
    }
    )
  }

  chnageCount(pId:string, pCount:number)
  {
    this.cartService.updateCart(pId, pCount).subscribe({
      next:(res)=>{
       if(pCount <= 0)
       {
        this.removeProduct(pId)
        return
       }
      this.toasterService.success("Item Updated Successfully")
      this.getMyCart()
      }
    })
    
  }
  clearAllProductsCart()
  {
    this.cartService.clearAllCart().subscribe({
      next:(res)=>{
        if(res.message == 'success')
        {
          this.toasterService.success('Deleted All', 'Shop Cart')
        }
        this.getMyCart()
      }
    })
  }
}
