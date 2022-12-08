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

  // desktop background config
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };

  // mobile background config
  slide1Background: any;
  slide2Background: any;

  // responsive variable
  isMobile: boolean;
  rowClass: string;

  constructor(private appStateService: AppStateService, private swipeRoute: SwipeRouteService,
    private router: Router) {
    // set background configs
    this.backgroundRight = {
      name: 'quarter-hexagon',
      pos: 'top-right'
    }
    this.backgroundLeft = {
      name: 'quarter-hexagon',
      pos: 'bottom-left'
    }

    this.slide1Background = {
      rightHex: 'quarter-hexagon',
      rightHexPos: 'top-right',
      leftHex: 'hexagon',
      leftHexPos: 'bottom-left'
    }
    this.slide2Background = {
      rightHex: 'quarter-hexagon',
      rightHexPos: 'bottom-right'
    }

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
              value: [75, 85, 90, 80, 75, 95, 95],
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

  onChartInit(event: any) {
    this.skillsChart = event;
  }

  ngOnInit(): void {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.setSkillsChartOption();
    //this.navBarSync.sync();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    var labelSize = getComputedStyle(document.body).getPropertyValue('--body-size');
    this.isMobile = this.appStateService.getIsMobileResolution();
    var option = this.skillsChart.getOption();
    option.radar[0].axisName.fontSize = labelSize;
    this.skillsChart.setOption(option);
    this.skillsChart.resize();
  }

  openPdf() {
    window.open(this.pdfLink);
  }

  onSwipe(event: any) {
    const dir = Math.abs(event?.deltaX) > 40 ? (event?.deltaX > 0 ? DIRECTION.right : DIRECTION.left) : DIRECTION.right;
    const newRoute = this.swipeRoute.getNextSwipeRoute('/portfolio', dir);
    this.router.navigateByUrl(newRoute);
  }

}
