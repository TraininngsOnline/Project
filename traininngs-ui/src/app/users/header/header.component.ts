import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ClarityIcons, userIcon, shoppingCartIcon, barsIcon, timesIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon,shoppingCartIcon,barsIcon,timesIcon);


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userConfig: any;

  btnStatus = false;

  constructor(private readonly usersService: UsersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.usersService.addedToCart.subscribe((value: any) => {
      console.log(value);
      if (!value) {
        this.userConfig.data!.cart = 0;
      } else if (value) {
        console.log(this.userConfig.data.cart);
        this.userConfig.data!.cart += value;
      }
    });
  }

  showLogin(): void {
    this.menuToggle();
    this.userConfig.showLoginPopup = true;
  }


  goToCart() {
    this.menuToggle();
    this.router.navigate(['/users/cart']);
  }

  goToWebinarsList(type: string) {
    this.menuToggle();
    this.router.navigate(['/users/webinars-list'], {queryParams: {type}});
  }

  menuToggle(){
    this.btnStatus = !this.btnStatus;
  }

  logout() {
    this.menuToggle();
    localStorage.clear();
    this.usersService.isLoggedIn.next(false);
    this.router.navigate(['/users']);
  }


}
