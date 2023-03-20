import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {

  blogTitle: string;
  blogId: string;
  blogCategory: string;
  blogContent: string;
  blogSummary: string;
  blogDate: string;
  picsURL: string[] = [];

  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute,
    private locationService: Location, private utilsService: UtilsService) {
    this.blogService.getBlogDetail(activatedRoute.snapshot.params['category'], activatedRoute.snapshot.params['id']).subscribe((res) => {
      //console.log(res.data);
      this.blogTitle = res.data.title;
      this.blogId = res.data.id;
      this.blogCategory = res.data.category;
      this.blogSummary = res.data.summary;
      this.blogContent = res.data.content;
      this.blogDate = utilsService.dateString(res.data.createdAt);
      //this.picsURL.push(res.data.pictures);
      //console.log(this);
    }, (error) => { console.log(error); });
  }

  goBack() {
    this.locationService.back();
  }

}
