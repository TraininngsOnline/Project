import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateWebinarComponent } from './create-webinar/create-webinar.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { AdminGuard } from './admin.guard';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { WebinarTypeComponent } from './webinar-type/webinar-type.component';
import { WebinarTypeListComponent } from './webinar-type-list/webinar-type-list.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'home', component: AdminHomeComponent, canActivate: [AdminGuard], children: [
      { path: 'create-webinar', component: CreateWebinarComponent },
      { path: 'webinars-list', component: WebinarsListComponent},
      { path: 'category', component: CategoryComponent },
      { path: 'category-list', component: CategoryListComponent },
      { path: 'webinar-type', component: WebinarTypeComponent },
      { path: 'webinar-type-list', component: WebinarTypeListComponent }
    ] }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
