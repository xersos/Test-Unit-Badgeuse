import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HebdoComponent} from '../hebdo/hebdo.component';
import * as $ from 'jquery';
import 'chartjs-plugin-annotation';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {


    listSubscription: Subscription;
    usersList;
    activeGraph = true;
    data = [];
    colorState = [];
    absences = [];
    @Input() startDate;

    /** CHART OPTION */
    barChartOptions = {
    scaleShowVerticalLines: true,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
            beginAtZero:true,
            max: 50,
            stacked: false
        },
      }],
        yAxes: [{ stacked: true }]
    },
    onClick: this.onClickBar.bind(this),
      annotation: {
          annotations: [{
              type: 'line',
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: 35,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                  enabled: false,
                  content: 'Test label'
              }
          }]
      }
    };

    /** LABEL NAME STUDENT */
    barChartLabels = [];

    /** CHART TYPE */
    barChartType = 'horizontalBar';

    /** CHART LEGEND */
    barChartLegend = false;

    /** CHART DATA */
    barChartData = [{
        data: this.data, // data total heure de la semaine
        label: 'Présence',
        stack: 1
    },{
        data: this.absences, // data total heure d'absence justifier
        label: 'Absence justifiée (malade, stage,etc...)',
        backgroundColor: '#9d9d9d',
        stack: 1
    }];

    /** CHART COLOR */
    colors = [{
    backgroundColor: this.colorState
    }];

    constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private hebdoComponent: HebdoComponent,
              private router: Router) { }

    ngOnInit() {
      this.refreshGraphic();

    }

    /**
     * subscription, update the data of graphic
     */
    refreshGraphic() {
      this.listSubscription = this.hebdoComponent.userListSubject.subscribe(
          (userList: any[]) => {
              this.usersList = userList;
              this.setGraphic();
          }
      );
    }

    /**
     * on click on bar graphic
     * @param table
     * @param bar
     */
    onClickBar(table, bar) {
      if (bar[0] !== undefined) {
          const userName = bar[0]._model.label;
          const dateSelected = new Date(this.startDate).toISOString().slice(0, 10);
          this.getIdUser((userId) => {
              this.router.navigate(['userDetail/' + userId + '/' + dateSelected]);
          }, userName);
      }
    }

    /**
     * get the id user select on click
     * @param callback
     * @param userName
     */
    getIdUser(callback, userName?) {
      this.userService.getIdUser((res) => {
          return callback(res);
      }, userName);
    }

    /**
     * Build and update the graphic data
     */
    setGraphic() {
      // clear all array of graphic
      this.data.length = 0;
      this.barChartLabels = [];
      this.colorState.length = 0;
      this.absences.length = 0;
      //console.log(this.usersList);

      this.usersList.forEach((user) => {

          // build userName array
          this.barChartLabels.push(user.userName);

          // build data array
          const duration = user.duration.substr(0, 5).replace(':', '.');
          this.data.push(duration);

          // build absence array
          let absence;
          const hourDay = 7;
          if (user.day === null) {
              absence = 0;
          } else {
              absence = user.day * hourDay;
          }
          this.absences.push(absence);

          // build color array
          if ((Number(duration) + absence) > 35) {
              this.colorState.push('#71e597'); // green
          } else {
              this.colorState.push('#df6e6e'); // red
          }
      });
      // Dynamic height of graphic
      $('.cadre-graph').height((this.usersList.length * 27.5));
    }
}
