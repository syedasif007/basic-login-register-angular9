import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './students/add/add.component';
import { ViewComponent } from './students/view/view.component';
import { EditComponent } from './students/edit/edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'add', component:AddComponent, canActivate: [AuthGuard]},
  {path:'view', component:ViewComponent, canActivate: [AuthGuard]},
  {path:'edit/:id', component:EditComponent, canActivate: [AuthGuard]},

  // otherwise redirect to 404 (current route is default)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
