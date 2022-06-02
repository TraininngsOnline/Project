import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon, employeeIcon, eventIcon, shareIcon, microphoneIcon, headphonesIcon, errorStandardIcon, trashIcon } from '@cds/core/icon';
ClarityIcons.addIcons(userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon, employeeIcon, eventIcon, shareIcon, microphoneIcon, headphonesIcon, errorStandardIcon, trashIcon);


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  webinars: any = [];
  paymentOptions: any = {};
  cart: any = [];
  totalPrice: number = 0;
  discountAttr: string = '';

  constructor(private readonly usersService: UsersService, private readonly router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.usersService.getCart().subscribe(response => {
      console.log(response);
      this.webinars = response.Items;
      this.paymentOptions = response.paymentOptions;
      // this.cart = response.cart;
      this.constructCart(response.cart);
      this.getTotalAmount();
    }, error => {
      console.log(error);
    });
  }

  getTotalAmount() {
    this.totalPrice = 0;
    this.cart.map((webinar: any) => {
      webinar.discountPayment = `dis${webinar.paymentFor}`;
      const price = this.isValid(webinar[webinar.discountPayment]) ? Number(webinar[webinar.discountPayment]) : Number(webinar[webinar.paymentFor]);
      this.totalPrice += price * (Number(webinar.quantity) || 1);
    });
  }

  isValid(value: any) {
    return Number(value) > 0 && Number(value) !== NaN;
  }

  changeQuantity(webinarIndex: number, type: string) {
    if (type === 'increement') {
      this.cart[webinarIndex].quantity++;
      this.updateCart(webinarIndex);
    } else if (this.cart[webinarIndex].quantity > 1) {
      this.cart[webinarIndex].quantity--;
      this.updateCart(webinarIndex);
    }
  }

  updateCart(webinarIndex: number) {
    this.usersService.updateQuantity(this.cart[webinarIndex]).subscribe((response: any) => {
      console.log(response);
      this.getTotalAmount();
    }, (error: any) => {
      console.log(error);
    })
  }

  constructCart(cart: any) {
    console.log(cart);
    this.usersService.addedToCart.next(0);
    this.usersService.addedToCart.next(cart.length);
    this.cart = [];
    cart.map((item: any) => {
      const webinarDetails = this.webinars.find((webinar: any) => webinar.id === item.id);
      const cartDetails = { ...item, ...webinarDetails };
      this.cart.push(cartDetails);
    });
    console.log(this.cart);
  }
  payment() {
    // const payload: any = {
    //   items: [
    //     { id: 1, quantity: 3 },
    //     { id: 2, quantity: 1 },
    //   ]
    // };
    const payload: any = {
      line_items: this.cart.map((webinar: any) => {
        const price = this.isValid(webinar[webinar.discountPayment]) ? Number(webinar[webinar.discountPayment]) : Number(webinar[webinar.paymentFor]);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: webinar.title,
            },
            unit_amount: price * 100,
          },
          quantity: webinar.quantity,
        }
      })
    }
    this.usersService.paySession(payload).subscribe((response: any) => {
      console.log(response);
      window.location = response.url;
    }, (error: any) => {
      console.log(error);
    });
  }

  // payment() {
  //   // this.router.navigate(['/users/payment']);
  // }

  deleteItem(webinar: any, index: number) {
    const { id, quantity, paymentFor } = webinar;
    this.usersService.deleteItem({ id, quantity, paymentFor }).subscribe(response => {
      console.log(response);
      this.getCartDetails();
    }, error => {
      console.log(error);
    })
  }

  getWebinarType(type: any) {
    const webinarTypes: any = {
      liveOneAttendeePrice: 'Live Version - One Attendee',
      livegroupAttendeesPrice: 'Live Version - Group Attendees',
      recOneAttendeePrice: 'Recorded Version - One Attendee',
      recgroupAttendeesPrice: 'Recorded Version - Group Attendee',
      comboOneAttendeePrice: 'Combo Version - One Attendee',
      combogroupAttendeesPrice: 'Combo Version - Group Attendee'
    }
    return webinarTypes[type];
  }

}
