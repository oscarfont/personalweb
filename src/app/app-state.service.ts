import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private isMobileResolution: boolean;

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
}
