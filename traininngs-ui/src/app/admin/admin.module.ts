import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { CreateWebinarComponent } from './create-webinar/create-webinar.component';
import { ClarityModule } from '@clr/angular';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { WebinarTypeComponent } from './webinar-type/webinar-type.component';
import { WebinarTypeListComponent } from './webinar-type-list/webinar-type-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    AdminHomeComponent,
    WebinarsListComponent,
    CreateWebinarComponent,
    AdminSideNavComponent,
    CategoryComponent,
    CategoryListComponent,
    WebinarTypeComponent,
    WebinarTypeListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    ClarityModule
  ]
})
export class AdminModule { }
