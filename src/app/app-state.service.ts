import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private isMobileResolution: boolean;
  private isSmallDesktop: boolean;

  constructor() {
  }

  public getIsMobileResolution(): boolean {
    if (window.innerWidth < 576) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    return this.isMobileResolution;
  }

  public getIsSmallDesktopResolution(): boolean {
    if (window.innerWidth < 768) {
      this.isSmallDesktop = true;
    } else {
      this.isSmallDesktop = false;
    }
    return this.isSmallDesktop;
  }
}
