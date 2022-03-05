import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { faCloud, faCode, faBrain, faLayerGroup, faSyncAlt, faDesktop, faMobileAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { EChartsOption, EChartsType } from 'echarts';

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
  option: EChartsOption;
  skillsChart: EChartsType;
  changeBackground: boolean;

  constructor(private appStateService: AppStateService) {
  }

  setSkillsChartOption() {
    this.option = {
      color: ['#67F9D8'],
      /*title: {
        text: 'Software Engineering Skills',
        bottom: '96%',
        left: '8%',
        textStyle : {
          fontFamily : 'Domine',
          color: '#f2f3f0',
          fontSize: '1.5rem'
        }
      },*/
      radar: [
        {
          indicator: [
            { text: 'Frontend', max: 100 },
            { text: 'Backend', max: 100 },
            { text: 'Database', max: 100 },
            { text: 'Deployment', max: 100 },
            { text: 'Testing', max: 100 },
            { text: 'Object Oriented', max: 100 },
            { text: 'Machine and Deep Learning', max: 100 }
          ],
          center: ['45%', '50%'],
          radius: 216,
          axisName: {
            color: '#f2f3f0',
            fontFamily: 'Montserrat',
            fontSize: '1rem',
            borderRadius: 3,
            padding: [3, 5]
          },
          shape: 'polygon'
        }
      ],
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 4,
              color: '#ef9841'
            }
          },
          data: [
            {
              value: [80, 90, 75, 60, 80, 85, 90],
              name: 'My Skills (out of 100)',
              areaStyle: {
                color: '#817c5f'
              },
              label: {
                show: true,
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                color: '#f2f3f0'
              },
              lineStyle: {
                color: '#817c5f'
              },
              itemStyle: {
                color: '#ef9841'
              }
            },
          ],
        },
      ]
    };
  }

  onChartInit(event) {
    this.skillsChart = event;
  }

  ngOnInit(): void {
    /*if(this.appStateService.getIsMobileResolution()){
      this.changeNavBarMobile();
      this.positionPictureMobile();
    }else{
      this.changeNavBarToDesktop();
      this.positionPictureDesktop();
    }*/
    this.changeBackground = this.appStateService.getIsMobileResolution();
    this.setSkillsChartOption();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //  console.log(event);
    this.changeBackground = this.appStateService.getIsMobileResolution();
    this.skillsChart.resize();
    /*console.log(this.appStateService.getIsMobileResolution());
    if(this.appStateService.getIsMobileResolution()){
      this.changeNavBarMobile();
      this.positionPictureMobile();
    }else{
      this.changeNavBarToDesktop();
      this.positionPictureDesktop();
    }*/
  }

  scroll(name) {
    let el = document.getElementById(name);
    //console.log(name);
    //console.log(el);
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

  changeNavBarMobile() {
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

  changeNavBarToDesktop() {
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

  positionPictureMobile() {
    let profilePic = document.getElementById('profile-pic');
    profilePic.style.top = '6%';
    profilePic.style.right = '6%';
  }

  positionPictureDesktop() {
    let profilePic = document.getElementById('profile-pic');
    profilePic.style.top = '20%';
    profilePic.style.right = '6%';
  }

  openPdf() {
    window.open(this.pdfLink);
  }

}
