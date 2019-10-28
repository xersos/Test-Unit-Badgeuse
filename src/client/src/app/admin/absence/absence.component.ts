import { Component, OnInit } from '@angular/core';
import { ExpressService } from "../../services/express.service";
import { Auth } from "../../guards/auth";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
import {AbsenceService} from "../../services/absence.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  absences;
  faDownload = faDownload;
  halfDayName = {
    0: 'La journée',
    1: 'Le matin',
    2: 'L\'après-midi'
  };


  constructor(private expressService: ExpressService,
              private absenceService: AbsenceService) { }

  ngOnInit() {
    // Call the uss List Absence
    this.getUserListAbsence();

  }


  /**
   * get the user  list to db
   */
  getUserListAbsence() {
    this.absences = [];
    this.absenceService.getUserListAbsence((res) => {
      this.absences = res.list;
      console.log('----liste des absences à afficher = ');
      console.log(this.absences);
      console.log('----');
    });
  }

  /**
   * On validate function button. Valide or refuse the absence
   * @param ref
   * @param valide
   */
  onValidate(ref, valide) {
    let valideName = 'Validez';
    let valideAdjectif = 'Validée';
    if (valide === 0) {valideName = 'Refusée';}

    swal({
      title: valideName + ' ?',
      text: "Confirmez-vous que vous " + valideAdjectif + " cette absence?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme !'
    }).then((result) => {
      if (result.value) {
        this.getUpdateAbsence(ref, valide);
      }
    });
  }

  /**
   * Update on db the absence status on validate or refused
   * @param ref
   * @param valide
   */
  getUpdateAbsence(ref, valide) {
    let valideName = 'validée';
    if (valide === 0) {valideName = 'refusée';}

    const content = {
      action: 'getUpdateAbsence',
      valide: valide,
      ref: ref
    };
    this.expressService.postExpress('absence_admin', content).subscribe((res: Auth) => {
      if (res.success) {
        swal(valideName + ' !', 'L\'absence a été ' + valideName, 'success');
        this.getUserListAbsence();
        this.absenceService.emitNbAbsenceSubject();
      } else {
        swal('Oups', 'Votre requête n\'a pu aboutir.', 'error');
      }
    });
  }
}

