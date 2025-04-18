import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Brands } from '../../interfaces/brands';
import { BrandService } from '../../../core/services/ecomm/brands/brand.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-head-home',
  imports: [CarouselModule, TranslatePipe],
  templateUrl: './head-home.component.html',
  styleUrl: './head-home.component.css'
})
export class HeadHomeComponent {

  private brandService : BrandService = inject(BrandService)
  allBrands : Brands[] = []
   customOptions: OwlOptions = {
      loop: true,
      stagePadding:50,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      rtl:true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 3
        }
      },
      nav: true
    }

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
