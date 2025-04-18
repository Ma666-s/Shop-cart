import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/ecomm/categories/categories.service';
import { Categories } from '../../../shared/interfaces/categories';
import { CardCategoriesComponent } from '../../../shared/components/card-categories/card-categories.component';

@Component({
  selector: 'app-categories',
  imports: [CardCategoriesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  private categoriesService : CategoriesService = inject(CategoriesService)
   categories : Categories[] = []

  constructor(){}

  ngOnInit(): void {
    this.getAllCategories()
    
  }
  getAllCategories()
  {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{this.categories = res.data;
      }
    })
  }
}
