import { Component, HostBinding, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NavbarComponent } from './features/layout/navbar/navbar.component';
import { FooterComponent } from './features/layout/footer/footer.component';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import { ThemeService } from './core/services/thememode/theme.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  darkMode = signal<boolean>(false)
  menuActive = false;
  scrolled = false;
  isDropdownOpen = false;
  isTouchDevice = false;
  private lastTouchTime = 0;

  private flowbiteService : FlowbiteService = inject(FlowbiteService)
  private spinnerService : NgxSpinnerService = inject(NgxSpinnerService)
  constructor(public theme: ThemeService){
  }
  
  ngOnInit(): void {

    /** spinner starts on init */
    this.spinnerService.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 5000);

    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
  @HostBinding('class.dark') get mode(){
    return this.darkMode();
   }

   @HostListener('window:scroll')
  onScroll() {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
    this.scrolled = window.scrollY > 50;
  }
}
