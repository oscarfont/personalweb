import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  htmlContent: any;
  formData: FormGroup;
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };
  options: Object;

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
    this.options = {
      placeholderText: 'Add your post content here...',
      fontFamily: {
        "Domine": "Titles Font",
        "Montserrat": "Subtitles Font",
        "Katamaran": "Body Font"
      }
    }
    this.formData = new FormGroup({
      title: new FormControl(''),
      category: new FormControl(''),
      summary: new FormControl(''),
      htmlContent: new FormControl('')
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
