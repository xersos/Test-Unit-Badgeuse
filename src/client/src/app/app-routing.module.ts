import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './guest/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/no-auth.guard';
import {PersonalSpaceComponent} from './user/personal-space/personal-space.component';
import {UserDetailComponent} from './admin/user-detail/user-detail.component';
import {HebdoComponent} from './admin/hebdo/hebdo.component';
import {Error404Component} from './guest/error404/error404.component';
import {UserRequestComponent} from './user/user-request/user-request.component';
import {AbsenceComponent} from './admin/absence/absence.component';
import {TableUsersComponent} from './admin/pages/table-users/table-users.component'

// ROUTER
const routes: Routes = [
  // admin
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'hebdo', component: HebdoComponent, canActivate: [AuthGuard] },
  { path: 'userDetail/:id_user/:dateSelected', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'absence', component: AbsenceComponent, canActivate: [AuthGuard] },
  { path: 'crudUser', component: TableUsersComponent, canActivate: [AuthGuard] },
  // user
  { path: 'userSpace', component: PersonalSpaceComponent, canActivate: [AuthGuard]},
  { path: 'userRequest', component: UserRequestComponent, canActivate: [AuthGuard]},
  // guest
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  // other
  { path: '', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
