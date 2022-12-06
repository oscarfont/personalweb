import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  htmlContent: any;
  formData: FormGroup;
  postMedia: Array<string>;
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };
  options: Object;

  constructor(private locationService: Location, private blogService: BlogService,
    private router: Router, private toastrService: ToastrService, private utilsService: UtilsService) {
    this.postMedia = new Array<string>();
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
      },

      // Set the image upload URL.
      imageUploadURL: 'http://localhost:3000/utils/uploadImage', // TODO change base path

      // Set request type.
      imageUploadMethod: 'POST',

      // Set max image size to 10MB.
      imageMaxSize: 10 * 1024 * 1024,

      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],

      events: {
        'image.uploaded': function (res: string) {
          const resObj = JSON.parse(res);
          const imageUrl = `http://localhost:3000/${resObj.data}`; // TODO change this
          this.image.insert(imageUrl, false, null, this.image.get(), { link: imageUrl });
          return false;
        },
        'image.removed': function (img: any) {
          const fileName = img[0].src.split('/')[3];
          utilsService.deleteImage(fileName).subscribe((res) => {
            toastrService.success('Image deleted successfully!');
          });
        }
      },

      imageStyles: {
        'post-style': 'imageStyle'
      },

      imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize']

    };
    this.formData = new FormGroup({
      title: new FormControl(''),
      category: new FormControl(''),
      summary: new FormControl(''),
      htmlContent: new FormControl('')
    });
  }

  ngOnInit(): void { }

  onPublishBlog(values: any) {
    //console.log(values);
    this.blogService.publishBlog(values.title, values.category, values.summary, values.htmlContent).subscribe((res) => {
      this.toastrService.success('Post published successfully!');
      this.router.navigateByUrl('/blog');
    }, (error: any) => { console.log(error); });
  }

  goBack() {
    this.locationService.back();
  }

}
