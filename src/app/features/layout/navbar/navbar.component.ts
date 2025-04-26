import { Component, HostBinding, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translate/translation.service';
import { ThemeService } from '../../../core/services/thememode/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  darkMode = signal<boolean>(false)
   private router = inject(Router)
   private authService = inject(AuthService)
   private translateService = inject(TranslationService)
   menuActive = false;
   scrolled = false;
   isLogin : boolean = false;
   routLink : Router = inject(Router)
  



   constructor(private translate: TranslateService, public theme: ThemeService) {
    translate.setDefaultLang('en');
  }

   ngOnInit(): void {
     this.authService.userData.subscribe(()=>{
      if(this.authService.userData.getValue() == null)
      {
        this.isLogin = false
      }
      else
      {
        this.isLogin = true
      }
     })
   }
   
   

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

   // أغلق القائمة عند النقر خارجها
   @HostListener('document:click', ['$event'])
   onClick(event: MouseEvent) {
     const target = event.target as HTMLElement;
     const isMenuButton = target.closest('.hamburger'); // تأكد أن النقر ليس على الزر نفسه
 
     if (!isMenuButton && this.menuActive) {
       this.menuActive = false;
     }
   }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }
  openDropdown() {
    // Add logic for touch devices if needed
  }

  closeDropdown() {
    // Add logic for touch devices if needed
  }

   @HostBinding('class.dark') get mode(){
    return this.darkMode();
   }

  logOut()
  {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    this.authService.userData.next(null);
  }
  changeLang(lang: string) {
    this.translateService.changeLang(lang);
  }
  checkRouterLink(link: string): boolean {
    return this.router.url === link;
  }
}
