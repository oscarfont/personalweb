import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from 'src/services/auth.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  categories: string[] = [];
  categoryPosts: Map<string, any[]>;
  userCookie: string;
  userName: string;
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };
  trashCanIcon = faTrashCan;

  constructor(private blogService: BlogService, public authService: AuthService,
    private toastrService: ToastrService) {
    this.backgroundRight = {
      name: 'quarter-hexagon',
      pos: 'bottom-right'
    }
    this.backgroundLeft = {
      name: 'quarter-hexagon',
      pos: 'top-left'
    }
    this.categoryPosts = new Map<string, any[]>();
    this.blogService.getAllCategories().subscribe(async (res) => {
      this.categories = res.data;
      for (let i = 0; i < this.categories.length; i++) {
        const cat = this.categories[i];
        this.blogService.getAllBlogsOf(cat).subscribe((res) => {
          this.categoryPosts.set(cat, res.data);
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.userCookie = this.authService.getCookie('token');
      this.userName = this.authService.getCookie('username');
    }
  }

  deletePost(event: any, id: string) {
    event.preventDefault();
    event.stopPropagation();
    this.blogService.deleteBlog(id).subscribe((data) => {
      this.toastrService.success('Post deleted sucessfully');
      window.location.reload();
    }, (error) => { this.toastrService.error('There was an error deleting the post'); });
  }

}
