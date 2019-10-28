import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UserService} from "../../services/user.service";
import { Chart } from 'chart.js'
import {FormGroup} from "@angular/forms";
import {HebdoComponent} from '../hebdo/hebdo.component';
import {Subscription} from "rxjs";
import {WEEK_HOURS} from "../../pie-chart/pie-chart.component";
import {HebdoService} from "../../services/hebdo.service";
import {StatusColorHandlerService} from "../../services/status-color-handler.service";


@Component({
  selector: 'app-pie-chart-admin',
  templateUrl: './pie-chart-admin.component.html',
  styleUrls: ['./pie-chart-admin.component.css']
})
export class PieChartAdminComponent implements OnInit, OnChanges  {

  @Input() startDate;
  PieChartAdmin;
  startDateTime;
  form: FormGroup;
  endDateTime;
  selectWeek = 1;
  listSubscription: Subscription;
  usersList;

  constructor(private userService: UserService,
              private hebdoService: HebdoService,
              private hebdoComponent: HebdoComponent,
              private statusColorHandlerService: StatusColorHandlerService) {
    this.getPieChartAdmin();

  }

  ngOnInit() {
    this.initDate();
    this.initPieChart();
    this.getPieChartAdmin();
    this.refreshGraphic();
  }

  /**
   * update the id of user when his change
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.getPieChartAdmin();
  }

  /**
   * Define the previous week
   */
  onPrevWeek() {
    this.selectWeek += 1;
    this.initDate();
    this.getPieChartAdmin();
  }

  /**
   * Define the next week
   */
  onNextWeek() {
    this.selectWeek -= 1;
    this.initDate();
    this.getPieChartAdmin()
  }

  /**
   * subscription, update the data of graphic
   * TODO check that method because it seems really strange
   */
  refreshGraphic() {
    this.listSubscription = this.hebdoComponent.userListSubject.subscribe(
        (userList: any[]) => {
          this.usersList = userList;
          this.getPieChartAdmin()
        }
    );
  }

  /**
   *  initializes the date of week
   */
  initDate() {
    const currFirst = new Date; // get current date for first
    const currLast = new Date; // get current date for last
    const first = currFirst.getDate() - currFirst.getDay() + 1 - (7 * this.selectWeek); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    this.startDateTime = new Date(currFirst.setHours(1, 0, 0, 0)); // set time at start day 00:00
    this.startDateTime = new Date(currFirst.setDate(first)).toISOString(); // set first day of week
    this.endDateTime = new Date(currLast.setHours(23, 59, 59, 0)); // set time at end day 23:00
    this.endDateTime = new Date(currLast.setDate(last)).toISOString(); // set last day of the week

    console.log(this.startDateTime);
    console.log(this.endDateTime);
  }

  getPieChartAdmin() {
    this.userService.getPieChartAdmin((err: string, dataFromBack: Array<number>, reasonFromBack: Array<string>) => {
      //console.log('data pieChartAdmin')
      //console.log(dataFromBack);
      //console.log(reasonFromBack);
      if (err) {
        // the chart will be empty
        console.error(err);
      } else {

        console.log('First request went fine received user presence data');
        console.log(dataFromBack);
        console.log(reasonFromBack);


        //get the user count to calculate nonJustifiedHours  else there are no non justified hours
        this.hebdoService.getUserCountHebdo((err: string, userCount: number) => {
          if (err) {
            // the chart will be empty
            console.error(err);
          } else {
            // calculate the non justified hours and add them to the report
            let nonJustifiedHours = WEEK_HOURS * userCount;
            Array.from(dataFromBack).forEach((justifiedHours: number) => {
              console.log(justifiedHours);
              nonJustifiedHours -= justifiedHours;
            });
            if(nonJustifiedHours < 0 ) {
              nonJustifiedHours = 0;
            }

            dataFromBack.push(nonJustifiedHours);
            reasonFromBack.push('Non Justifiées');

            console.log('Both request went fine received user presence and user count data');
            console.log(dataFromBack);
            console.log(reasonFromBack);
            console.log('non justifiées');
            console.log(nonJustifiedHours);
          }


          let dataColors = [];
          let borderColor = [];
          reasonFromBack.forEach( (reason: string) => {
            dataColors.push(this.statusColorHandlerService.getStatusColorFromStatusName(reason));
            borderColor.push('rgba(255,255,255,255)');
          });

          console.log('derniere validation');
          console.log(dataFromBack);
          console.log(reasonFromBack);

          this.PieChartAdmin.data.labels = reasonFromBack;
          this.PieChartAdmin.data.datasets.forEach((dataset) => {
            dataset.data = dataFromBack;
            dataset.backgroundColor = dataColors;
            dataset.borderColor = borderColor;
          });
          this.PieChartAdmin.update();

        }, this.hebdoComponent.filterGroup);

      }



    }, this.startDateTime, this.endDateTime);
  }

  initPieChart() {
    this.PieChartAdmin = new Chart('pieChartAdmin', {
      type: 'pie',
      data: {
        labels: ['loading'],

        datasets: [{
          label: '# of Votes',
          data: [100],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 4
        }]
      },
      options: {
        title: {
          text: 'Répartitions des heures',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
