import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isMobile: boolean;
  columnClass: string;

  // desktop background config
  changeBackground: boolean;
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };

  // mobile background config
  slide1Background: any;
  slide2Background: any;

  constructor(private toastrService: ToastrService,
    private appStateService: AppStateService) {

    // set background configs
    this.backgroundRight = {
      name: 'quarter-hexagon',
      pos: 'bottom-right'
    }
    this.backgroundLeft = {
      name: 'quarter-hexagon',
      pos: 'top-left'
    }

    this.slide1Background = {
      rightHex: 'hexagon',
      rightHexPos: 'bottom-right',
      leftHex: 'quarter-hexagon',
      leftHexPos: 'top-left'
    }
    this.slide2Background = {
      leftHex: 'quarter-hexagon',
      leftHexPos: 'bottom-left'
    }

  }

  ngOnInit(): void {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.changeBackground = this.isMobile ? true : false;
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.changeBackground = this.isMobile ? true : false;
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  copyEmail(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.success('Email copied successfully to clipboard!');
  }

}
