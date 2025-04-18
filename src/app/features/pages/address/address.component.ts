import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../core/services/ecomm/allorders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  private activatedRoute : ActivatedRoute = inject(ActivatedRoute)
  private orderService : OrdersService = inject(OrdersService)
  cartId: string = ''

  addressForm : FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })

  addressSubmit()
  {
   this.activatedRoute.paramMap.subscribe((p)=>{
   this.cartId = p.get('cartId')!
   this.orderService.checkOut(this.cartId, this.addressForm.value).subscribe({
    next:(res)=>{
      window.location.href = res.session.url
    }
   })
   })
  }
}
