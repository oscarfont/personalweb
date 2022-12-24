import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private isMobileResolution: boolean;
  private isSmallDesktop: boolean;
  private isMediumDesktop: boolean;

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
    if (window.innerWidth < 992) {
      this.isSmallDesktop = true;
    } else {
      this.isSmallDesktop = false;
    }
    return this.isSmallDesktop;
  }

  public getIsMediumDesktopResolution(): boolean {
    if (window.innerWidth < 1400) {
      this.isMediumDesktop = true;
    } else {
      this.isMediumDesktop = false;
    }
    return this.isMediumDesktop;
  }
}
