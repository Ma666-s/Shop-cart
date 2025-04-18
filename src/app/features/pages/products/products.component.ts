import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../core/services/ecomm/product/product.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CardComponent, SearchPipe, FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  private productService = inject(ProductService);
private destroy$ = new Subject<void>();

// Converted to signals
allProducts = signal<Product[]>([]);
userWord = signal<string>('');
searchResults = signal<any[]>([]);
errorMessage = signal<string>('');
loading = signal<boolean>(false);
hasSearched = signal<boolean>(false);
searchNameLoading = signal(false);
searchNameError = signal('');
searchNameHasSearched = signal(false);

// Keep FormControl as is (reactive forms)
pPrice = new FormControl();

ngOnInit(): void {
  this.getAllProductsHome();
  this.searchWithPrice();
}

getAllProductsHome() {
  this.productService.getAllProducts().subscribe({
    next: (res) => {
      this.allProducts.set(res.data);
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
        this.errorMessage.set(''); // إعادة تعيين رسالة الخطأ
        return this.productService.getSpecProductsPrice(query).pipe(
          catchError(err => {
            this.errorMessage.set('Failed to load products. Please try again later.');
            return of({data: []}); // إرجاع مصفوفة فارغة في حالة الخطأ
          })
        );
      } else {
        this.hasSearched.set(false);
        this.searchResults.set([]); // إعادة تعيين نتائج البحث
        this.getAllProductsHome();
        return of(null);
      }
    }),
    takeUntil(this.destroy$)
  ).subscribe({
    next: (res) => {
      this.loading.set(false);
      if (res === null) {
        // حالة عدم وجود بحث
        return;
      }
      
      if (res?.data?.length > 0) {
        this.searchResults.set(res.data);
        this.allProducts.set(res.data);
      } else {
        this.searchResults.set([]);
        this.allProducts.set([]);
      }
    }
  });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}
