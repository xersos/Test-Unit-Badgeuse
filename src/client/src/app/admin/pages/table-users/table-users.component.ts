import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CrudUserService} from '../../../services/cruduser.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {CrudUser} from '../../../services/models/cruduser.model';
import {AddDialogUsersComponent} from '../../items/dialogs-users/add-users/add-users.dialog.component';
import {EditDialogUsersComponent} from '../../items/dialogs-users/edit-users/edit-users.dialog.component';
import {DeleteDialogUsersComponent} from '../../items/dialogs-users/delete-users/delete-users.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import { AuthTokenService } from 'src/app/services/auth-token.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})

export class TableUsersComponent implements OnInit {
  displayedColumns = ['id_user', 'prenom_user', 'nom_user', 'mail_user', 'id_group', 'id_role', 'card', 'actions'];
  exampleDatabase: CrudUserService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id_user: string;

  constructor(
              private authTokenService: AuthTokenService,
              public toastr: ToastrService,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: CrudUserService) {}


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(user: CrudUser) {
    const dialogRef = this.dialog.open(AddDialogUsersComponent, {
      data: {user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id_user: string, prenom_user: string, nom_user: string, mail_user: string, id_group: string, id_role: string, card: string) {
    this.id_user = id_user;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogUsersComponent, {
      data: {id_user: id_user, prenom_user: prenom_user, nom_user: nom_user, mail_user: mail_user, id_group: id_group, id_role: id_role, card: card}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id_user === this.id_user);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id_user: string, prenom_user: string, nom_user: string, mail_user: string, id_group: string, id_role: string, card: string) {
    this.index = i;
    this.id_user = id_user;
    const dialogRef = this.dialog.open(DeleteDialogUsersComponent, {
      data: {id_user: id_user, prenom_user: prenom_user, nom_user: nom_user, mail_user: mail_user, id_group: id_group, id_role: id_role, card: card}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id_user === this.id_user);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new CrudUserService(this.toastr, this.httpClient, this.authTokenService);
// tslint:disable-next-line: no-use-before-declare
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<CrudUser> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: CrudUser[] = [];
  renderedData: CrudUser[] = [];

  constructor(public _exampleDatabase: CrudUserService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CrudUser[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getUser();
    console.log(this._exampleDatabase.getUser());

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((user: CrudUser) => {
          const searchStr = ( user.id_user + user.prenom_user + user.nom_user + user.mail_user + user.id_group + user.id_role + user.card ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: CrudUser[]): CrudUser[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id_user': [propertyA, propertyB] = [a.id_user, b.id_user]; break;
        case 'prenom_user': [propertyA, propertyB] = [a.prenom_user, b.prenom_user]; break;
        case 'nom_user': [propertyA, propertyB] = [a.nom_user, b.nom_user]; break;
        case 'mail_user': [propertyA, propertyB] = [a.mail_user, b.mail_user]; break;
        case 'id_group': [propertyA, propertyB] = [a.id_group, b.id_group]; break;
        case 'id_role': [propertyA, propertyB] = [a.id_role, b.id_role]; break;
        case 'card': [propertyA, propertyB] = [a.card, b.card]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
