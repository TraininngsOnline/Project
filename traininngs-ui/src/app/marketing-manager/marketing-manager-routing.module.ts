import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketingManagerComponent } from './marketing-manager.component';
import { LoginComponent } from './login/login.component';
import { MmHomeComponent } from './mm-home/mm-home.component';
import { MmOrdersComponent } from './mm-orders/mm-orders.component';
import { MarketingManagerGuard } from './marketing-manager.guard';
import { SignupUsersComponent } from './signup-users/signup-users.component';
import { SpeakersComponent } from './speakers/speakers.component';

const routes: Routes = [
  { path: '', component: MarketingManagerComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: MmHomeComponent, canActivate: [MarketingManagerGuard], children: [
      { path: 'orders', component: MmOrdersComponent }, 
      { path: 'users', component: SignupUsersComponent },
      { path: 'speakers', component: SpeakersComponent },
      { path: '**', redirectTo: 'orders' }
    ] },
    { path: '**', redirectTo: 'login' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingManagerRoutingModule { }
