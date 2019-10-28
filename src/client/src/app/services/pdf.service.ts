import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

    /**
     * Set the view page to PDF document
     * @param startDate
     * @param endDate
     * @param callback
     */
  downloadPDF(startDate, endDate, callback) {

    // CANVAS2HTML FUNCTION
        const data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {

        // Few necessary setting options
        const imgWidth = 295;
        let imgHeight = canvas.height * imgWidth / canvas.width;

        // if height of canvas is too big
        if (canvas.height > 1196) {
            imgHeight = 208;
        }

    // GENERATE PDF FUNCTION
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save(startDate.substring(0, 10) + ' au ' + endDate.substring(0, 10) + '-badgeuseUHA40.pdf'); // Generated PDF

     // return true on callback
        return callback(true);
    });
  }
}
