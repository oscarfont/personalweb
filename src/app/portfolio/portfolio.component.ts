import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { faCloud, faCode, faBrain, faLayerGroup, faSyncAlt, faDesktop, faMobileAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { EChartsOption, EChartsType } from 'echarts';
import { DIRECTION, SwipeRouteService } from 'src/services/swiperoute.service';
import { Router } from '@angular/router';

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
  initOpts: any;
  chartToolTip: Array<string>;

  // background classes
  bgDesktopClass: string;
  bgMobileClasses: string[];

  // responsive variable
  isSmallDesktop: boolean;
  isMobile: boolean;
  rowClass: string;

  constructor(private appStateService: AppStateService, private swipeRoute: SwipeRouteService,
    private router: Router) {
    this.chartToolTip = ["Frontend", "Backend", "Database", "DevOps", "Quality Assurance", "Object Oriented Programming", "Machine Learning"];
  }

  setSkillsChartOption() {
    var labelSize = getComputedStyle(document.body).getPropertyValue('--body-size');
    this.option = {
      color: ['#67F9D8'],
      radar: [
        {
          indicator: [
            { text: 'Front', max: 100 },
            { text: 'Back', max: 100 },
            { text: 'DB', max: 100 },
            { text: 'DevOps', max: 100 },
            { text: 'QA', max: 100 },
            { text: 'OOP', max: 100 },
            { text: 'ML', max: 100 }
          ],
          center: ['45%', '50%'],
          radius: '72%',
          axisName: {
            color: '#f2f3f0',
            fontFamily: 'Montserrat',
            fontSize: labelSize,
            borderRadius: 3,
            padding: [3, 5],
            overflow: 'break'
          },
          shape: 'polygon',
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
              value: [80, 95, 90, 80, 85, 95, 85],
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
      ],
      tooltip: {
        show: true,
        renderMode: 'html',
        formatter: (params: any): string => {
          let htmlList: string = '<span> My Skills (out of 100) </span><ul>'
          for (let index = 0; index < params.value.length; index++) {
            const tooltipName = this.chartToolTip[index];
            const chartValue = params.value[index];
            htmlList += '<li>' + tooltipName + ': ' + chartValue + '</li>'
          }
          htmlList += '</ul>';
          return htmlList;
        },
        className: 'tooltip-container'
      }
    };
  }

  setBackgroundClasses() {
    this.bgDesktopClass = this.isSmallDesktop || this.isMobile ? '' : 'background-desktop';
    this.bgMobileClasses = this.isSmallDesktop || this.isMobile ? ['background-column-1', 'background-column-2'] : ['', ''];
  }

  onChartInit(event: any) {
    this.skillsChart = event;
  }

  ngOnInit(): void {
    this.isSmallDesktop = this.appStateService.getIsSmallDesktopResolution();
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.setBackgroundClasses();
    this.setSkillsChartOption();
    //this.navBarSync.sync();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    var labelSize = getComputedStyle(document.body).getPropertyValue('--body-size');
    this.isSmallDesktop = this.appStateService.getIsSmallDesktopResolution();
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.setBackgroundClasses();
    var option = this.skillsChart.getOption();
    option.radar[0].axisName.fontSize = labelSize;
    this.skillsChart.setOption(option);
    this.skillsChart.resize();
  }

  openPdf() {
    window.open(this.pdfLink);
  }

  onSwipe(event: any) {
    if (this.isMobile) {
      const dir = Math.abs(event?.deltaX) > 40 ? (event?.deltaX > 0 ? DIRECTION.right : DIRECTION.left) : DIRECTION.right;
      const newRoute = this.swipeRoute.getNextSwipeRoute('/portfolio', dir);
      this.router.navigateByUrl(newRoute);
    }
  }

}
