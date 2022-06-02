import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { ClarityIcons, trashIcon, noteIcon } from '@cds/core/icon';
ClarityIcons.addIcons(trashIcon, noteIcon);

@Component({
  selector: 'app-webinar-type-list',
  templateUrl: './webinar-type-list.component.html',
  styleUrls: ['./webinar-type-list.component.scss']
})
export class WebinarTypeListComponent implements OnInit {

  webinarTypes: any;

  constructor(private readonly adminService: AdminService,
    private readonly toasterService: ToasterService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getwebinarTypes();
  }

  getwebinarTypes() {
    this.adminService.getWebinarTypes().subscribe(response => {
      this.webinarTypes = response.Items;
    }, error => {
      console.log(error);
    });
  }

  delete(id: string) {
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
          this.getwebinarTypes();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  edit(id: string) {
    this.router.navigate(['/admin/home/category'], {queryParams: {id: id}});
  }

}
