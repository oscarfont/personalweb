import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'src/services/utils.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  htmlContent: any;
  formData: FormGroup;
  options: Object;

  constructor(private locationService: Location, private blogService: BlogService,
    private router: Router, private toastrService: ToastrService, private utilsService: UtilsService, private authService: AuthService) {
    this.options = {
      placeholderText: 'Add your post content here...',

      fontFamily: {
        "Domine": "Titles Font",
        "Montserrat": "Subtitles Font",
        "Katamaran": "Body Font"
      },

      // tell the editor that the image has to be uploaded
      imageUpload: true,

      // Set max image size to 10MB.
      imageMaxSize: 10 * 1024 * 1024,

      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],

      requestHeaders: {
        authorization: `Bearer ${this.authService.getCookie('token')}`
      },

      events: {
        'image.beforeUpload': async function (images: Array<File>) {
          const image = images[0];
          const editor = this;
          utilsService.uploadImage(image).subscribe((res) => {
            const imageUrl = `${environment.backendHost}/public${res.data}`;
            //editor.image.insert(imageUrl, false, null, editor.image.get(), res);
            editor.image.get().url = imageUrl;
            blogService.addPostMedia(`/public${res.data}`);
          });
          return false;
        },
        'image.removed': function (img: any) {
          const fileName = img[0].src.slice(img[0].src.lastIndexOf('/')).replace("/", "");
          utilsService.deleteImage(fileName).subscribe((res) => {
            toastrService.success('Image deleted successfully!');
          });
          blogService.removePostMedia(fileName);
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

  onPublishBlog(values: any) {
    //console.log(values);
    this.blogService.publishBlog(values.title, values.category, values.summary, values.htmlContent, this.blogService.getPostMedia()).subscribe((res) => {
      this.toastrService.success('Post published successfully!');
      this.router.navigateByUrl('/blog');
    }, (error: any) => { console.log(error); });
  }

  goBack() {
    this.locationService.back();
  }

}
