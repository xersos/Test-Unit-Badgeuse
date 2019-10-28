import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UserService} from '../services/user.service';
import { Chart } from 'chart.js';
import {FormGroup} from '@angular/forms';
import {StatusColorHandlerService, StatusColors} from "../services/status-color-handler.service";
import {forEach} from "@angular/router/src/utils/collection";


export const WEEK_HOURS = 35;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges  {

  @Input() id_user;
  PieChart;
  startDateTime ;
  form: FormGroup;
  endDateTime ;
  selectWeek = 1;


  constructor(private userService: UserService, private statusColorHandlerService: StatusColorHandlerService) {
    this.getPieChart();

  }

  ngOnInit() {
    this.initDate();
    this.initPieChart();
    this.getPieChart();

  }

  /**
   * update the id of user when his change
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.getPieChart();
  }

  /**
   * Define the previous week
   */
  onPrevWeek() {
    this.selectWeek += 1;
    this.initDate();
    this.getPieChart();
  }

  /**
   * Define the next week
   */
  onNextWeek() {
    this.selectWeek -= 1;
    this.initDate();
    this.getPieChart();
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

    console.log(this.startDateTime + ' s');
    console.log(this.endDateTime + ' e');
  }

  getPieChart() {
    console.log('service getPieChart request');
    this.userService.getPieChart((err: string, dataFromBack: Array<number>, reasonFromBack: Array<string>) => {
      if (err) {
        // the chart will be empty
        console.error(err);
      } else {

        // calculate the non justified hours and add them to the report
        let nonJustifiedHours = WEEK_HOURS;
        Array.from(dataFromBack).forEach((justifiedHours: number) => {
          console.log(justifiedHours);
          nonJustifiedHours -= justifiedHours;
        });
        if (nonJustifiedHours < 0 ) {
          nonJustifiedHours = 0;
        }


        dataFromBack.push(nonJustifiedHours);
        reasonFromBack.push('Non Justifiées');

        /*
        console.log('request went fine received data ');
        console.log(dataFromBack);
        console.log(reasonFromBack);
        console.log('non justifiées');
        console.log(nonJustifiedHours);

         //*/
      }

      let dataColors = [];
      let borderColor = [];
      reasonFromBack.forEach( (reason: string) => {
        dataColors.push(this.statusColorHandlerService.getStatusColorFromStatusName(reason));
        borderColor.push('rgba(255,255,255,255)');
      });
      //console.log(dataColors);


      this.PieChart.data.labels = reasonFromBack;
      this.PieChart.data.datasets.forEach((dataset) => {
        dataset.data = dataFromBack;
        dataset.backgroundColor = dataColors;
        dataset.borderColor = borderColor;
      });
      this.PieChart.update();

    }, this.id_user, this.startDateTime, this.endDateTime);

  }

  initPieChart() {
    this.PieChart = new Chart('pieChart', {
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
