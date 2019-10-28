import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './guest/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { LoginService} from './services/login.service';
import { ExpressService} from './services/express.service';
import { UserService} from './services/user.service';
import { CrudUserService } from './services/cruduser.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BadgerComponent } from './menu/badger/badger.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { BadgerService} from './services/badger.service';
import { PersonalSpaceComponent } from './user/personal-space/personal-space.component';
import { GraphComponent } from './admin/graph/graph.component';
import { ListeComponent } from './menu/liste/liste.component';
import { OrderModule } from 'ngx-order-pipe';
import { ChartsModule } from 'ng2-charts';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { HebdoComponent } from './admin/hebdo/hebdo.component';
import { MonthlyCalendarComponent } from './user/monthly-calendar/monthly-calendar.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { Error404Component } from './guest/error404/error404.component';
import { AbsenceComponent } from './admin/absence/absence.component';
import { UserRequestComponent } from './user/user-request/user-request.component';
import { WebsocketService } from './services/websocket.Service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FileUploadModule} from 'ng2-file-upload';
import { ReplaceSpace } from './pipe/replaceSpace';
import { TruncatePipe} from './pipe/truncate';
import { TableUsersComponent } from './admin/pages/table-users/table-users.component';
import { AddDialogUsersComponent } from './admin/items/dialogs-users/add-users/add-users.dialog.component';
import { EditDialogUsersComponent } from './admin/items/dialogs-users/edit-users/edit-users.dialog.component';
import { DeleteDialogUsersComponent } from './admin/items/dialogs-users/delete-users/delete-users.dialog.component';


import { ToastrModule } from 'ngx-toastr';

import {
  MatFormFieldModule, MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule, MatCardModule

 } from '@angular/material';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartAdminComponent } from './admin/pie-chart-admin/pie-chart-admin.component';
 

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    BadgerComponent,
    PersonalSpaceComponent,
    GraphComponent,
    ListeComponent,
    UserDetailComponent,
    HebdoComponent,
    MonthlyCalendarComponent,
    Error404Component,
    UserRequestComponent,
    AbsenceComponent,
    ReplaceSpace,
    TruncatePipe,
    TableUsersComponent,
    AddDialogUsersComponent,
    EditDialogUsersComponent,
    DeleteDialogUsersComponent,
    PieChartComponent,
    PieChartAdminComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    OrderModule,
    ChartsModule,
    FormsModule,
    BrowserModule,
    FullCalendarModule,
    FileUploadModule,

    /** Material Modules */

    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule, 
    MatListModule, 
    MatIconModule, 
    MatMenuModule, 
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,

    /** Additional **/
    NgxChartsModule,


  ],
  entryComponents: [
    AddDialogUsersComponent,
    EditDialogUsersComponent,
    DeleteDialogUsersComponent
  ],

  providers: [
      AuthGuard,
      LoginService,
      ExpressService,
      UserService,
      BadgerService,
      WebsocketService,
      CrudUserService,
      { provide: LOCALE_ID, useValue: 'fr' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


  bootstrap: [AppComponent]
})
export class AppModule { }
