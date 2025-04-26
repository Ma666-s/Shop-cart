import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotfoundComponent } from './features/layout/notfound/notfound.component';
import { AllordersComponent } from './features/pages/allorders/allorders.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { HomeComponent } from './features/pages/home/home.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { AddressComponent } from './features/pages/address/address.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { ForgetPasswordComponent } from './features/auth/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {path:"", redirectTo:"products", pathMatch:"full"},
    {path:"home", component:HomeComponent, title:"Home", canActivate:[authGuard]},
    {path:"cart", component:CartComponent, title:"Cart", canActivate:[authGuard]},
    {path:"products", component:ProductsComponent, title:"Products"},
    {path:"categories", loadComponent: ()=> import('./features/pages/categories/categories.component').then(catClasses => catClasses.CategoriesComponent), title:"Categories", canActivate:[authGuard]},
    {path:"brands", loadComponent: ()=> import('./features/pages/brands/brands.component').then(brandClasses => brandClasses.BrandsComponent), title:"Brands", canActivate:[authGuard]},
    {path:"allorders", component:AllordersComponent, title:"All Orders", canActivate:[authGuard]},
    {path:"products-details/:pDid", component:ProductDetailsComponent, title:"Product Details", canActivate:[authGuard]},
    {path:"address/:cartId", component:AddressComponent, title:"Address", canActivate:[authGuard]},
    {path:"register", component:RegisterComponent, title:"Register"},
    {path:"login", component:LoginComponent, title:"Login"},
    {path:"forget-password", component:ForgetPasswordComponent, title:"Forget Password"},
    {path:"**", component:NotfoundComponent, title:"Not Found"},
];
