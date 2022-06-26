import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ClarityIcons, userIcon, shoppingCartIcon, barsIcon, timesIcon, videoGalleryIcon, imageGalleryIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon,shoppingCartIcon,barsIcon,timesIcon, videoGalleryIcon, imageGalleryIcon);


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userConfig: any;

  btnStatus = false;
  open= false;
  userName='';
  mobile: boolean = false;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = event.target.innerWidth < 992 ?  true : false;
  }
  constructor(private readonly usersService: UsersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.usersService.addedToCart.subscribe((value: any) => {
      if (!value) {
        this.userConfig.data!.cart = 0;
      } else if (value) {
        this.userConfig.data!.cart += value;
      }
    });

    this.usersService.getTokenDetails().subscribe(res => this.userName = Array.from(res.username)[0] as string)
  }

  showLogin(): void {
    this.menuToggle();
    this.userConfig.showLoginPopup = true;
  }


  goToCart() {
    this.menuToggle();
    this.router.navigate(['/users/cart']);
  }

  goto() {
    this.open = !this.open;
    this.router.navigate(['/users/my-orders']);
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
