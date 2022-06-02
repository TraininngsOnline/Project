import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { HomeComponent } from './home/home.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { DetailedWebinarComponent } from './detailed-webinar/detailed-webinar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { SpeakerOpportunityComponent } from './speaker-opportunity/speaker-opportunity.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UsersGuard } from './users.guard';

const routes: Routes = [
  { path: '', component: UsersComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'webinars-list', component: WebinarsListComponent },
    { path: 'webinar-detail', component: DetailedWebinarComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'cart', component: CartComponent, canActivate: [ UsersGuard ] },
    { path: 'order-update', component: PaymentComponent, canActivate: [ UsersGuard ] },
    { path: 'speaker-opportunity', component: SpeakerOpportunityComponent },
    { path: 'support', component:SupportPageComponent },
    { path:'terms-conditions', component:TermsConditionsComponent },
    { path:'refund-policy', component:RefundPolicyComponent },
    {path:'privacy-policy', component:PrivacyPolicyComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
