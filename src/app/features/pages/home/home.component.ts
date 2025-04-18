import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CardComponent } from "../../../shared/components/card/card.component";
import { ProductService } from '../../../core/services/ecomm/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from '../../../core/services/translate/translation.service';
import { TranslatePipe } from '@ngx-translate/core';
import { HeadHomeComponent } from '../../../shared/components/head-home/head-home.component';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [HeadHomeComponent, CarouselModule, FormsModule, TranslatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private productService = inject(ProductService);
  private translateService = inject(TranslationService);
  private destroyRef = inject(DestroyRef);

  // Signals
  userWord = signal('');
  allProducts = signal<Product[]>([]);
  searchResults = signal<Product[]>([]);
  errorMessage = signal('');
  loading = signal(false);
  hasSearched = signal(false);

  // FormControl remains the same
  pPrice = new FormControl();

  // Owl Carousel Options
  customOptions = {
    loop: true,
    stagePadding: 50,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 7 }
    },
    nav: true
  };

  ngOnInit(): void {
    this.getAllProductsHome();
    this.searchWithPrice();
  }

  getAllProductsHome() {
    this.loading.set(true);
    this.productService.getAllProducts().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.searchResults.set(res.data);
        this.allProducts.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching all products:', err);
        this.errorMessage.set('Failed to load products. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  searchWithPrice() {
    this.pPrice.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(query => {
        if (query) {
          this.loading.set(true);
          this.hasSearched.set(true);
          return this.productService.getSpecProductsPrice(query);
        } else {
          this.hasSearched.set(false);
          this.getAllProductsHome();
          return of(null);
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res?.data) {
          this.searchResults.set(res.data);
          this.allProducts.set(res.data);
        } else if (res === null) {
          // Handle empty query case
          this.searchResults.set([]);
        } else {
          this.searchResults.set([]);
          this.allProducts.set([]);
        }
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Error fetching products:', err);
        this.errorMessage.set('Failed to load products. Please try again later.');
      }
    });
  }
}
