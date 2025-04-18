import { Component, Input } from '@angular/core';
import { Categories } from '../../interfaces/categories';

@Component({
  selector: 'app-card-categories',
  imports: [],
  templateUrl: './card-categories.component.html',
  styleUrl: './card-categories.component.css'
})
export class CardCategoriesComponent {
  @Input() cardCategories !: Categories

}
