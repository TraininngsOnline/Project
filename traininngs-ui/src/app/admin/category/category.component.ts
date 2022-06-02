import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm !: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly adminService: AdminService,
    private readonly toaster: ToasterService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      this.adminService.saveCategory(this.categoryForm.value).subscribe(response => {
        this.toaster.success('Category Saved');
      }, error => {
        this.toaster.error('Error while Saving');
      })
    }
  }

}
