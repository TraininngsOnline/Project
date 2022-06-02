import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m=> m.UsersModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m=> m.AdminModule) },
  { path: 'marketing-manager', loadChildren: () => import('./marketing-manager/marketing-manager.module').then(m=> m.MarketingManagerModule) },
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
