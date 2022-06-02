import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { ClarityIcons, trashIcon, noteIcon } from '@cds/core/icon';
ClarityIcons.addIcons(trashIcon, noteIcon);

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: any;

  constructor(private readonly adminService: AdminService,
    private readonly toasterService: ToasterService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.adminService.getCategories().subscribe(response => {
      this.categories = response.Items;
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
        this.adminService.deleteCategory(id).subscribe(response => {
          this.toasterService.success('Webinar Deleted');
          this.getCategories();
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
