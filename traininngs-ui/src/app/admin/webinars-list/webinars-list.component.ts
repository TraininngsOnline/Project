import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { ClarityIcons, trashIcon, noteIcon } from '@cds/core/icon';
ClarityIcons.addIcons(trashIcon, noteIcon);

@Component({
  selector: 'app-webinars-list',
  templateUrl: './webinars-list.component.html',
  styleUrls: ['./webinars-list.component.scss']
})
export class WebinarsListComponent implements OnInit {

  webinars: any;

  constructor(private readonly adminService: AdminService,
    private readonly toasterService: ToasterService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getWebinars();
  }

  getWebinars() {
    this.adminService.getWebinars().subscribe(response => {
      this.webinars = response;
    }, error => {
      console.log(error);
    });
  }

  deleteWebinar(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteWebinar(id).subscribe(response => {
          this.toasterService.success('Webinar Deleted');
          this.getWebinars();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  edit(id: string) {
    this.router.navigate(['/admin/home/create-webinar'], {queryParams: {id: id}});
  }

}
