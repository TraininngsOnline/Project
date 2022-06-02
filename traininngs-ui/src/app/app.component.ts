import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoading: boolean = true;

  constructor(private readonly apiService: ApiService, private readonly router: Router) {
  }

  ngOnInit() {
    this.apiService.isLoading.subscribe(response => {
      setTimeout(() => {
        this.isLoading = response;
      });
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(event => event as NavigationStart)
    ).subscribe(event => {
      console.log(event);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
}
