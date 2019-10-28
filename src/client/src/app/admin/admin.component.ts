import { Component, OnInit } from '@angular/core';
import {AbsenceService} from "../services/absence.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nbAbsence = 0;

  constructor(private absenceService: AbsenceService) { }

  ngOnInit() {
    this.getTotalAbsence();
  }

  getTotalAbsence() {
    this.absenceService.getUserListAbsence((res) => {
      this.nbAbsence = res.length;
    })
  }



}
