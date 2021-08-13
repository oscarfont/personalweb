import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public blogPostList : any[] = [];

  constructor(private blogService : BlogService) { 
    this.blogService.getAllBlogs().forEach((req) => {
      req.subscribe((res : any)=>{
        //console.log(res.data);
        for(let i = 0; i<res.data.length; i++){
          this.blogPostList.push(res.data[i]);
        }
      },(error : any) => {console.log(error)});
    });
  }

  ngOnInit(): void {}

}
