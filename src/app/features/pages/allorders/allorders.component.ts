import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/ecomm/allorders/orders.service';
import { AllOrders } from '../../../shared/interfaces/allorders';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  private orderService : OrdersService = inject(OrdersService)
   allOrders : AllOrders[] = []

  constructor(){}


  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders()
  {
    this.orderService.getAllOrders().subscribe({
      next:(res)=>{ this.allOrders = res.data[0].cartItems
        console.log(res.data[0].cartItems);
      }
    })
  }
  
}
