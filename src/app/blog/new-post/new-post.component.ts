import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
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
  formData: UntypedFormGroup;
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
    this.formData = new UntypedFormGroup({
      title: new UntypedFormControl(""),
      category: new UntypedFormControl(""),
      summary: new UntypedFormControl(""),
      htmlContent: new UntypedFormControl("")
    });
  }

  ngOnInit(): void { }

  onPublishBlog(values: any) {
    console.log(values);
    this.blogService.publishBlog(values.title, values.category, values.summary, values.htmlContent).subscribe((res) => {
      this.toastrService.success('Post published successfully!');
      this.router.navigateByUrl('/blog');
    }, (error: any) => { console.log(error); });
  }

  goBack() {
    this.locationService.back();
  }

}
