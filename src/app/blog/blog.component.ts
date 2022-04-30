import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogPostList: any[] = [];
  userCookie: string;
  userName: string;
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };

  constructor(private blogService: BlogService, public authService: AuthService) {
    this.backgroundRight = {
      name: 'quarter-hexagon',
      pos: 'bottom-right'
    }
    this.backgroundLeft = {
      name: 'quarter-hexagon',
      pos: 'top-left'
    }
    if (this.authService.isUserLoggedIn()) {
      this.userCookie = this.authService.getCookie('token');
      this.userName = this.authService.getCookie('username');
    }
    this.blogService.getAllBlogs().forEach((req) => {
      req.subscribe((res: any) => {
        //console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.blogPostList.push(res.data[i]);
        }
      }, (error: any) => { console.log(error) });
    });
  }

  ngOnInit(): void { }

  deletePost(category, id) {
    this.blogService.deleteBlog(category, id).subscribe((data) => {
      console.log('SUCCESS');
    }, (error) => { console.log(error); });
  }

}
