import { Component, inject, OnInit } from '@angular/core';
import { CardBrandComponent } from "../../../shared/components/card-brand/card-brand.component";
import { Brands } from '../../../shared/interfaces/brands';
import { BrandService } from '../../../core/services/ecomm/brands/brand.service';

@Component({
  selector: 'app-brands',
  imports: [CardBrandComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  private brandService : BrandService = inject(BrandService)
  allBrands : Brands[] = []
  constructor(){}

  ngOnInit(): void {
    this.getAllbrands()
  }
  getAllbrands()
  {
    this.brandService.getAllBrandsFromApi().subscribe({
      next:(res)=>{
       this.allBrands = res.data
        
      }
    })
  }
  

}
