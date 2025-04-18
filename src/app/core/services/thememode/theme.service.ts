// theme.service.ts
import { Injectable, effect, signal, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  darkMode = signal<boolean>(this.initialTheme);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  get initialTheme(): boolean {
    if (!this.isBrowser) return false;
    try {
      return JSON.parse(localStorage.getItem('darkMode') ?? 'false');
    } catch {
      return false;
    }
  }

  constructor() {
    effect(() => {
      if (this.isBrowser) {
        try {
          localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
          this.updateDomTheme();
        } catch (error) {
          console.error('Theme preference save failed:', error);
        }
      }
    });

    this.darkMode.set(this.initialTheme);
    this.updateDomTheme();
  }

  private updateDomTheme() {
    if (!this.isBrowser) return;
    this.document.documentElement.classList.toggle('dark', this.darkMode());
  }

  toggleTheme() {
    this.darkMode.update(mode => !mode);
  }
}