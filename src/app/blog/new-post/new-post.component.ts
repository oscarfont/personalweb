import { Component, OnInit } from '@angular/core';
//import { AngularEditorComponent } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl} from '@angular/forms';
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

  htmlContent : any;
  editorConfig: AngularEditorConfig;
  formData : FormGroup; 

  constructor(private locationService: Location,private blogService: BlogService,
              private router: Router,private toastrService : ToastrService,) { 
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
        minHeight: '20rem',
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
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'},
          {class: 'roboto', name: 'Roboto'}
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
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['bold', 'italic'],
        ['fontSize']
      ]
    };
  }

  onPublishBlog(values){
    console.log(values);
    this.blogService.publishBlog(values.title,values.category,values.summary,values.htmlContent).subscribe((res)=>{
      this.toastrService.success('Post published successfully!');
      this.router.navigateByUrl('/blog');
    },(error)=>{console.log(error);});
  }

  goBack(){
    this.locationService.back();
  }

}
