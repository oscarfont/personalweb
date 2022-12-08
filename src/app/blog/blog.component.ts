import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from 'src/services/auth.service';
import { faTrashCan, faPenNib } from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';
import { DIRECTION, SwipeRouteService } from 'src/services/swiperoute.service';
import { Router } from '@angular/router';

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
  penIcon = faPenNib;

  constructor(private blogService: BlogService, public authService: AuthService,
    private toastrService: ToastrService, private swipeRoute: SwipeRouteService, private router: Router) {
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
    //this.navBarSync.sync();
  }

  deletePost(event: any, id: string) {
    event.preventDefault();
    event.stopPropagation();
    this.blogService.deleteBlog(id).subscribe((data) => {
      this.toastrService.success('Post deleted sucessfully');
      window.location.reload();
    }, (error) => { this.toastrService.error('There was an error deleting the post'); });
  }

  onSwipe(event: any) {
    const dir = Math.abs(event?.deltaX) > 40 ? (event?.deltaX > 0 ? DIRECTION.right : DIRECTION.left) : DIRECTION.right;
    const newRoute = this.swipeRoute.getNextSwipeRoute('/blog', dir);
    this.router.navigateByUrl(newRoute);
  }

}
