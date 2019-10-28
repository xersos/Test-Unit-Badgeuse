import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Auth} from '../../guards/auth';
import {CalendarComponent} from 'ng-fullcalendar';
import {OptionsInput} from '@fullcalendar/core';
import * as moment from 'moment';
import * as $ from 'jquery';
import {ExpressService} from '../../services/express.service';
import * as FC from 'ng-fullcalendar/node_modules/@types/fullcalendar';

@Component({
    selector: 'app-monthly-calendar',
    templateUrl: './monthly-calendar.component.html',
    styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit, OnChanges {

    calendarOptions: OptionsInput;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    @Input() monthActive = 'month';
    @Input() id_user;
    absencesDates;
    presencesDates;
    eachDate = [];
    @Input() selectedWeek;
    backgroundColor;
    startWeek;
    endWeek;

    constructor(private expressService: ExpressService) { }

    ngOnInit() { }

    /**
     * update the id of user when his change
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.id_user = changes.id_user.currentValue;
        this.getEventAbsence();
        this.getEventPresence();
    }


    /**
     * edit and define each date of calendar for absence
     */
    getEventAbsence() {
        this.absencesDates = 0;
        this.eachDate = [];
        const content = {
            action: 'getMonth',
            id_user: this.id_user
        };
        let i = 0;
        console.log('getMonth data');
        this.expressService.postExpress('calendar', content).subscribe((res: Auth) => {
            console.log('getAbsences  = ');
            console.log(res);
            if(res.success) {
                this.absencesDates = res.list;

                if (this.absencesDates.length !== 0) {
                    this.absencesDates.forEach((absence) => {

                        // DEFINE COLOR
                        if (absence.status === 0) { // Absence refusée
                            this.backgroundColor = '#ff3c38';
                        }
                        if (absence.status === 1) { // Absence validée
                            this.backgroundColor = '#0075ff';
                        }
                        if (absence.status === 2) { // En attente
                            this.backgroundColor = '#ff912a';
                        }

                        // DEFINE JOURNEY / MORNING / AFTERNOON
                        if (absence.half === 0) { // Journéé
                            this.startWeek = absence.day + 'T09:00:00';
                            this.endWeek = absence.day + 'T17:00:00';
                        }
                        if (absence.half === 1) { // matin
                            this.startWeek = absence.day + 'T09:00:00';
                            this.endWeek = absence.day + 'T12:30:00';
                        }
                        if (absence.half === 2) { // aprés_midi
                            this.startWeek = absence.day + 'T13:30:00';
                            this.endWeek = absence.day + 'T17:00:00';
                        }

                        // MAKE ARRAY FOR CALENDAR EVENT
                        this.eachDate.push(
                            {
                                start: absence.day,
                                end: absence.day,
                                backgroundColor: this.backgroundColor,
                                rendering: 'background'
                            },
                            {
                                start: this.startWeek,
                                end: this.endWeek,
                                textColor: '#111',
                                title: absence.reason.toUpperCase(),
                                backgroundColor: 'transparent',
                                borderColor: 'transparent'
                            },
                            {
                                start: this.startWeek,
                                end: this.endWeek,
                                backgroundColor: this.backgroundColor,
                                rendering: 'background'
                            }
                        );
                        i++;
                        if (this.absencesDates.length === i) {
                            this.calendar();
                        }
                    });
                } else {
                    this.calendar();
                }
            } else {
                console.error('Error requesting the calendar month data');
            }
        });
    }

    /**
     * edit and define each date of calendar for presence
     */
    getEventPresence() {
        this.presencesDates = 0;
        this.eachDate = [];
        const content = {
            action: 'getWeek',
            id_user: this.id_user
        };
        let i = 0;
        this.expressService.postExpress('calendar', content).subscribe((res: Auth) => {

            if (res.success) {
                console.log('Calendar week presences list : ');
                console.log(this.presencesDates);

                this.presencesDates = res.list;
                this.presencesDates.forEach((presence) => {

                    // ADD TO ARRAY FOR CALENDAR EVENT
                    this.eachDate.push(
                        {
                            start: presence.startHeure + 'T' + presence.startMinute,
                            end: presence.endHeure + 'T' + presence.endMinute,
                            textColor: '#111',
                            backgroundColor: 'transparent',
                            borderColor: 'transparent'
                        },
                        {
                            start: presence.startHeure + 'T' + presence.startMinute,
                            end: presence.endHeure + 'T' + presence.endMinute,
                            backgroundColor: '#4baf00',
                            rendering: 'background'
                        }
                    );
                    i++;
                    if (this.presencesDates.length === i) {
                        this.calendar();
                    }
                });
            } else {
                console.error('Error requesting the calendar week data')
                this.calendar();
            }
        });

    }

    /**
     * set the calendar option and refresh
     */
    calendar() {
        const calendar = $('#Calendar');
        // remove event calendar
        calendar.fullCalendar('removeEvents'); // remove all events

        this.calendarOptions = {
            defaultView: this.monthActive,
            showNonCurrentDates: true,
            defaultDate: this.selectedWeek,
            weekends: false,
            locale: 'fr',
            editable: false,
            eventLimit: false,
            slotLabelFormat: 'HH:mm',
            allDaySlot: false,
            minTime: '07:00:00',
            maxTime: '20:00:00',
            height: 730,
            header: {
                left: 'title',
                center: '',
                right: 'prev, agendaWeek, month, next'
            },
            buttonText: {
                month: 'Mois',
                week: 'Semaine'
            },
            events: this.eachDate
        };

        // add and refresh event calendar
        calendar.fullCalendar('addEventSource', this.eachDate); // add new events
        calendar.fullCalendar('rerenderEvents'); // refresh
    }
}
