import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { faCloud, faCode, faBrain, faLayerGroup, faSyncAlt, faDesktop, faMobileAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  cloudIcon = faCloud;
  codeIcon = faCode;
  barainIcon = faBrain;
  layersIcon = faLayerGroup;
  syncIcon = faSyncAlt;
  mobileIcon = faMobileAlt;
  desktopIcon = faDesktop;
  elipsisIcon = faEllipsisH;

  pdfLink = "./assets/portfolio/cv.pdf";
  option : EChartsOption;
  
  constructor(private appStateService : AppStateService) {
  }

  ngOnInit(): void {
    /*if(this.appStateService.getIsMobileResolution()){
      this.changeNavBarMobile();
      this.positionPictureMobile();
    }else{
      this.changeNavBarToDesktop();
      this.positionPictureDesktop();
    }*/
    this.option = {
      color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
      title: {
        text: 'Customized Radar Chart'
      },
      legend: {},
      radar: [
        {
          indicator: [
            { text: 'Indicator1', max: 150 },
            { text: 'Indicator2', max: 150 },
            { text: 'Indicator3', max: 150 },
            { text: 'Indicator4', max: 120 },
            { text: 'Indicator5', max: 108 },
            { text: 'Indicator6', max: 72 }
          ],
          center: ['75%', '50%'],
          radius: 120,
          axisName: {
            color: '#fff',
            backgroundColor: '#666',
            borderRadius: 3,
            padding: [3, 5]
          }
        }
      ],
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 4
            }
          },
          data: [
            {
              value: [100, 8, 0.4, -80, 2000],
              name: 'Data A'
            },
            {
              value: [60, 5, 0.3, -100, 1500],
              name: 'Data B',
              areaStyle: {
                color: 'rgba(255, 228, 52, 0.6)'
              }
            }
          ]
        }
      ]
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /*console.log(this.appStateService.getIsMobileResolution());*/
    if(this.appStateService.getIsMobileResolution()){
      this.changeNavBarMobile();
      this.positionPictureMobile();
    }else{
      this.changeNavBarToDesktop();
      this.positionPictureDesktop();
    }
  }

  scroll(name) {
    let el = document.getElementById(name);
    //console.log(name);
    //console.log(el);
    setTimeout(()=>{                           
      el.scrollIntoView({behavior:"smooth"});
    }, 500);
  }

  changeNavBarMobile(){
    // do not move top of profile pic
    /*let profilePic = document.getElementById('profile-pic');
    profilePic.style.top = '8rem';*/
    // change navbar pills and content
    let tagCol = document.getElementById('sections-column');
    tagCol.className = 'row';
    let sections = document.getElementById('v-pills-tab');
    sections.className = 'nav nav-pills';
    let pillsContent = document.getElementById('sections-content');
    pillsContent.className = 'row';
  }

  changeNavBarToDesktop(){
    // do not move top of profile pic
    /*let profilePic = document.getElementById('profile-pic');
    profilePic.style.top = '12rem';*/
    // change navbar pills and content
    let tagCol = document.getElementById('sections-column');
    tagCol.className = 'col-6 col-sm-2';
    let sections = document.getElementById('v-pills-tab');
    sections.className = 'nav flex-column nav-pills';
    let pillsContent = document.getElementById('sections-content');
    pillsContent.className = 'col-6 col-sm-10';
  }

  positionPictureMobile(){
    let profilePic = document.getElementById('profile-pic');
    profilePic.style.top = '6%';
    profilePic.style.right = '6%';
  }

  positionPictureDesktop(){
    let profilePic = document.getElementById('profile-pic');
    profilePic.style.top = '20%';
    profilePic.style.right = '6%';
  }

  openPdf(){
    window.open(this.pdfLink);
  }

}
