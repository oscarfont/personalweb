import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogTitle: string;
  blogId: string;
  blogCategory: string;
  blogContent: string;
  blogSummary: string;
  picsURL: string[] = [];
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };

  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute, private locationService: Location) {
    this.backgroundRight = {
      name: 'quarter-hexagon',
      pos: 'bottom-right'
    }
    this.backgroundLeft = {
      name: 'quarter-hexagon',
      pos: 'top-left'
    }
    this.blogService.getBlogDetail(activatedRoute.snapshot.params['category'], activatedRoute.snapshot.params['id']).subscribe((res) => {
      //console.log(res.data);
      this.blogTitle = res.data.title;
      this.blogId = res.data.id;
      this.blogCategory = res.data.category;
      this.blogSummary = res.data.summary;
      this.blogContent = res.data.content;
      //this.picsURL.push(res.data.pictures);
      //console.log(this);
    }, (error) => { console.log(error); });
  }

  ngOnInit(): void { }

  goBack() {
    this.locationService.back();
  }

}
