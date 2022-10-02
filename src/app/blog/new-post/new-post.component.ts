import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Location } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  htmlContent: any;
  formData: FormGroup;
  editorConfig: AngularEditorConfig;
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };

  constructor(private locationService: Location, private blogService: BlogService,
    private router: Router, private toastrService: ToastrService,) {
    this.backgroundRight = {
      name: 'quarter-hexagon',
      pos: 'bottom-right'
    }
    this.backgroundLeft = {
      name: 'quarter-hexagon',
      pos: 'top-left'
    }
    this.formData = new FormGroup({
      title: new FormControl(""),
      category: new FormControl(""),
      summary: new FormControl(""),
      htmlContent: new FormControl("")
    });
  }

  ngOnInit(): void {
    this.editorConfig = {
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
      uploadUrl: 'v1/image',
      sanitize: true,
      toolbarPosition: 'top'
    }
  }

  onPublishBlog(values) {
    console.log(values);
    this.blogService.publishBlog(values.title, values.category, values.summary, values.htmlContent).subscribe((res) => {
      this.toastrService.success('Post published successfully!');
      this.router.navigateByUrl('/blog');
    }, (error) => { console.log(error); });
  }

  goBack() {
    this.locationService.back();
  }

}
