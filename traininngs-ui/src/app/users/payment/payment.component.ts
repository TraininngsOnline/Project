import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

// import { StripeService, StripeCardComponent } from 'ngx-stripe';
// import {
//   StripeCardElementOptions,
//   StripeElementsOptions
// } from '@stripe/stripe-js';
import { UsersService } from '../services/users.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  totalPrice: number = 0;
  webinars: any = [];
  paymentStatus: any = '';
  imageUrl: any = ''
  // @ViewChild(StripeCardComponent) card !: StripeCardComponent;

  // cardOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       iconColor: '#666EE8',
  //       color: '#31325F',
  //       fontWeight: '300',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSize: '18px',
  //       '::placeholder': {
  //         color: '#CFD7E0'
  //       }
  //     }
  //   }
  // };

  // elementsOptions: StripeElementsOptions = {
  //   locale: 'en'
  // };

  paymentForm!: FormGroup;

  constructor(
    private readonly usersService: UsersService, private readonly toaster: ToasterService,
    private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.paymentForm = this.fb.group({
    //   name: ['', [Validators.required]]
    // });
    this.paymentStatus = this.activatedRoute.snapshot.queryParamMap.get('status');
    if (this.paymentStatus) {
      this.imageUrl = this.paymentStatus === 'success' ? 'assets/img/payment-success.jpeg' : 'assets/img/payment-failed.jpeg';
      this.getCartDetails();
    }
    
  }

  getCartDetails() {
    this.usersService.getCart().subscribe(response => {
      this.getTotalAmount(response);
    }, error => {
      console.log(error);
    });
  }

  getTotalAmount(response: any) {
    const paymentDetails: any = {
      liveOneAttendeePrice: 'Live One Attendee',
      livegroupAttendeesPrice: 'Live Group Attendee',
      recOneAttendeePrice: 'Recorded One Attendee',
      recgroupAttendeesPrice: 'Recorded Group Attendee',
      comboOneAttendeePrice: 'Combo One Attendee',
      combogroupAttendeesPrice: 'Combo Group Attendee'
    };
    let cart: any = [];
    response.cart.map((item: any) => {
      const webinarDetails = response.Items.find((webinar: any) => webinar.id === item.id);
      const cartDetails = { ...item, ...webinarDetails };
      const discountAttr = `dis${cartDetails.paymentFor}`;
      const sellingPrice = this.isValid(cartDetails[discountAttr]) ? Number(cartDetails[discountAttr]) : Number(cartDetails[cartDetails.paymentFor]);
      this.webinars.push({
        webinarId: cartDetails.id,
        title: cartDetails.title,
        paymentFor: paymentDetails[cartDetails.paymentFor],
        webinarType: cartDetails.webinarType,
        speakerName: cartDetails.author,
        quantity: cartDetails.quantity,
        price: cartDetails[cartDetails.paymentFor],
        subTotal: sellingPrice * Number(cartDetails.quantity),
        discountPrice: this.isValid(cartDetails[discountAttr]) ? Number(cartDetails[discountAttr]) : '',
        initialRequest: '',
        initialReferer: ''
      })
      cart.push(cartDetails);
    });
    cart.map((webinar: any) => {
      const discountAttr = `dis${webinar.paymentFor}`;
      const price = this.isValid(webinar[discountAttr]) ? Number(webinar[discountAttr]) : Number(webinar[webinar.paymentFor]);
      this.totalPrice += price * (Number(webinar.quantity) || 1);
    });
    this.pay();
  }

  isValid(value: any) {
    return Number(value) > 0 && Number(value) !== NaN;
  }

  pay(): void {
    // const name = this.paymentForm.get('name')!.value;
    // this.stripeService
    //   .createToken(this.card.element, { name })
    //   .subscribe((result) => {
    //     if (result.token) {
    //       // Use the token
    //       console.log(result.token.id);
          const requestPayload = {
            amount: this.totalPrice,
            // token: result.token.id,
            name,
            webinars: this.webinars,
            paymentStatus: this.paymentStatus
          };
          this.usersService.orderUpdate(requestPayload).subscribe(response => {
            this.usersService.addedToCart.next(0);
            this.toaster.success(response.message);
            this.router.navigate(['/users']);
          }, error => {
            this.toaster.error('order updation failed');
            console.log(error);
          });
      //   } else if (result.error) {
      //     // Error creating the token
      //     console.log(result.error.message);
      //   }
      // });
  }

  ngOnDestroy() {
    this.router.navigate(['/users']);
  }

}
