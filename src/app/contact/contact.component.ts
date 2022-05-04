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

  constructor(private toastrService: ToastrService,
    private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  scroll(name: string) {
    let el = document.getElementById(name);
    //console.log(name);
    //console.log(el);
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

  copyEmail(val: string, element: string) {
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
    this.scroll(element);
    this.toastrService.success('Email copied successfully to clipboard!');
  }

}
