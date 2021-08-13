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

  blogTitle : string;
  blogId : string;
  blogCategory : string;
  blogContent : string;
  blogSummary : string;
  picsURL : string[] = [];

  constructor(private blogService : BlogService, private activatedRoute: ActivatedRoute, private locationService: Location) {
    this.blogService.getBlogDetail(activatedRoute.snapshot.params['category'],activatedRoute.snapshot.params['id']).subscribe((res)=>{
      //console.log(res.data[0]);
      if(res.data.length == 1){
        this.blogTitle = res.data[0].info.title;
        this.blogId = res.data[0].id;
        this.blogCategory = res.data[0].category;
        this.blogSummary = res.data[0].info.summary;
        this.blogContent = res.data[0].info.content;
        this.picsURL.push(res.data[0].info.pictures);
        //console.log(this);
      }
    },(error)=>{console.log(error);});
  } 

  ngOnInit(): void {}

  goBack(){
    this.locationService.back();
  }

}
