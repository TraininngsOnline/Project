import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStripeModule } from 'ngx-stripe';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { LoginComponent } from './login/login.component';
import { DetailedWebinarComponent } from './detailed-webinar/detailed-webinar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UpcomingWebinarsComponent } from './upcoming-webinars/upcoming-webinars.component';
import { OndemandWebinarsComponent } from './ondemand-webinars/ondemand-webinars.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ClarityModule } from '@clr/angular';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { SpeakerOpportunityComponent } from './speaker-opportunity/speaker-opportunity.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgbModule }
from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UsersComponent,
    HeaderComponent,
    HomeComponent,
    WebinarsListComponent,
    LoginComponent,
    DetailedWebinarComponent,
    AboutUsComponent,
    ContactUsComponent,
    UpcomingWebinarsComponent,
    OndemandWebinarsComponent,
    CartComponent,
    PaymentComponent,
    MyOrdersComponent,
    MainFooterComponent,
    SpeakerOpportunityComponent,
    SupportPageComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    RefundPolicyComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    ClarityModule,
    NgbModule,
    NgxPaginationModule,
    NgxStripeModule.forRoot("pk_live_51JncvYSIU6OIPH9XryMKNsNjmTQD0nY6jXQqKs2FKjAPm1K9oAocnXk1cnJM9Qke0EHNahYb6beXBASQQh3EN7h500SrJHytm3")
  ]
})
export class UsersModule { }
