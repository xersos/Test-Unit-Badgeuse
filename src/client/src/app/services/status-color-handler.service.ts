import { Injectable } from '@angular/core';



export const enum StatusColors {
  NON_JUSTIFIED = 'rgba(255,0,12,0.73)',
  PRESENT =       'rgba(18,255,23,0.69)',
  JUSTIFIED_TELEWORKING = 'rgba(0,150,27,0.5)',
  JUSTIFIED_STAGE = 'rgba(30, 144, 255, 0.5)',
  JUSTIFIED_HILLNESS = 'rgba(135, 206, 250, 0.5)',
  JUSTIFIED_OTHER = 'rgba(0, 191, 255, 0.5)'

}




@Injectable({
  providedIn: 'root'
})
export class StatusColorHandlerService {

  statusNameToColorMapping = new Map<string, StatusColors>();

  constructor() {
    this.statusNameToColorMapping.set('malade', StatusColors.JUSTIFIED_HILLNESS);
    this.statusNameToColorMapping.set('stage', StatusColors.JUSTIFIED_STAGE);
    this.statusNameToColorMapping.set('alternance', StatusColors.JUSTIFIED_STAGE);
    this.statusNameToColorMapping.set('autre raison', StatusColors.JUSTIFIED_OTHER);
    this.statusNameToColorMapping.set('non justifiee', StatusColors.NON_JUSTIFIED);
    this.statusNameToColorMapping.set('non justifiees', StatusColors.NON_JUSTIFIED);
    this.statusNameToColorMapping.set('present', StatusColors.PRESENT);
    this.statusNameToColorMapping.set('presence', StatusColors.PRESENT);
    this.statusNameToColorMapping.set('formation à distance', StatusColors.JUSTIFIED_TELEWORKING);
    this.statusNameToColorMapping.set('formation a distance', StatusColors.JUSTIFIED_TELEWORKING);
    this.statusNameToColorMapping.set('FOAD', StatusColors.JUSTIFIED_TELEWORKING);
  }


  /**
   * get the color associated to a given status. NOTA : the process is case and accent unsensitive
   * @param statusName : the name of the status requested
   */
  getStatusColorFromStatusName(statusName: string): StatusColors {

    //sanitize the string
    var cleanName = statusName.toLowerCase();
    cleanName = cleanName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    console.log(cleanName);
    return this.statusNameToColorMapping.get(cleanName);
  }

  /**
   * get the list of all handled status names
   */
  getStatusList(): Iterable<string> {
    return this.statusNameToColorMapping.keys();
  }
}
