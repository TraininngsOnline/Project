import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdminService } from '../services/admin.service';
import { ToasterService } from '../../services/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-create-webinar',
  templateUrl: './create-webinar.component.html',
  styleUrls: ['./create-webinar.component.scss']
})
export class CreateWebinarComponent implements OnInit {

  createWebinar: FormGroup;
  editId: string = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  categories: any = [];
  webinarTypes: any = [];
  speakers: any = [];

  constructor(private readonly fb: FormBuilder, private readonly adminService: AdminService,
    private readonly toasterService: ToasterService, private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {
    this.createWebinar = this.getWebinarForm();
  }

  ngOnInit(): void {
    this.getOptions();
    this.editId = this.activatedRoute.snapshot.queryParams.id;
    if (this.editId) {
      this.initEditForm();
    }
  }

  getOptions() {
    // const result = this.adminService.getCategories();
    // const result = forkJoin([categories]);
    // console.log(result, categories);
    this.getMultipleResponses().subscribe(response => {
      this.categories = response[0].Items;
      this.webinarTypes = response[1].Items;
      this.speakers = response[2].Items;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getMultipleResponses(): Observable<any> {
    const categories = this.adminService.getCategories();
    const webinarTypes = this.adminService.getWebinarTypes();
    const speakers = this.adminService.getSpeakers();
    return forkJoin([categories, webinarTypes, speakers]);
  }

  initEditForm() {
    const filter = `/id/${this.editId}/false`;
    this.adminService.getWebinar(filter).subscribe(response => {
      const formValue = response[0];
      const controls = [
        'id',
        'title',
        'author',
        'description',
        'date',
        'pdtTime',
        'edtTime',
        'liveOneAttendeePrice',
        'livegroupAttendeesPrice',
        'recOneAttendeePrice',
        'recgroupAttendeesPrice',
        'comboOneAttendeePrice',
        'combogroupAttendeesPrice',
        'disliveOneAttendeePrice',
        'dislivegroupAttendeesPrice',
        'disrecOneAttendeePrice',
        'disrecgroupAttendeesPrice',
        'discomboOneAttendeePrice',
        'discombogroupAttendeesPrice',
        'duration',
        'webinarType',
        'webinarLink',
        'category',
        'whyShouldAttend',
        'benfit',
        'areasCovered',
        'speaker'
        // 'htmlContent'
      ];
      controls.forEach(control => {
        this.createWebinar.get(control)!.setValue(formValue[control]);
      });
      this.createWebinar.get('thumbnailImage')!.setValue(formValue.webinarImageUrl);
      this.createWebinar.get('authorImage')!.setValue(formValue.authorImageUrl);
      this.createWebinar.get('title')!.setValue(formValue.title);
    }, error => {
      this.toasterService.error(error.message);
    })
  }

  getWebinarForm(): FormGroup {
    return this.fb.group({
      id: [],
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      pdtTime: [''],
      edtTime: [''],
      liveOneAttendeePrice: [''],
      livegroupAttendeesPrice: [''],
      recOneAttendeePrice: [''],
      recgroupAttendeesPrice: [''],
      comboOneAttendeePrice: [''],
      combogroupAttendeesPrice: [''],
      disliveOneAttendeePrice: [''],
      dislivegroupAttendeesPrice: [''],
      disrecOneAttendeePrice: [''],
      disrecgroupAttendeesPrice: [''],
      discomboOneAttendeePrice: [''],
      discombogroupAttendeesPrice: [''],
      duration: ['', Validators.required],
      webinarType: [''],
      webinarLink: ['', Validators.required],
      category: [''],
      thumbnailImage: [''],
      authorImage: [''],
      whyShouldAttend: [''],
      benfit: [''],
      areasCovered: [''],
      speaker: ['']
      // htmlContent: []
    });
  }

  saveWebinar() {
    if (this.createWebinar.valid) {
      this.adminService.saveWebinar(this.createWebinar.value).subscribe(response => {
        this.toasterService.success('Successfully Saved');
        if (this.editId) {
            this.router.navigate(['/admin/home/webinars-list'])
        }
        this.createWebinar = this.getWebinarForm();        
      }, error => {
        this.toasterService.error(error.message);
      });
    } else {
      
    }
  }

  fileUpload(event: any, control: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // reader.onload = this._handleReaderLoaded.bind(this);
      reader.onload = (readerEvt: any) => {
        this.createWebinar.get(control)!.setValue(btoa(readerEvt.target.result));
        this.createWebinar.get(control)!.updateValueAndValidity();
      }
      reader.readAsBinaryString(file);
    }
  }

  // _handleReaderLoaded(readerEvt: any) {
  //   var binaryString = readerEvt.target.result;
  //   console.log(btoa(binaryString));
  // }

}
