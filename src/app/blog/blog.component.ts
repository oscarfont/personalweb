import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from 'src/services/auth.service';
import { faTrashCan, faPenNib, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';
import { DIRECTION, SwipeRouteService } from 'src/services/swiperoute.service';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state.service';
import { UtilsService } from 'src/services/utils.service';

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
  trashCanIcon = faTrashCan;
  penIcon = faPenNib;
  locationIcon = faLocationDot;
  searchIcon = faMagnifyingGlass;
  isMobile = false;

  /* labels that might change with time */
  currentlyLearning = 'Kotlin';
  location = 'Madrid';


  constructor(private blogService: BlogService, public authService: AuthService,
    private toastrService: ToastrService, private swipeRoute: SwipeRouteService,
    private router: Router, private appStateService: AppStateService, private utilService: UtilsService) {
    this.categoryPosts = new Map<string, any[]>();
    this.blogService.getAllCategories().subscribe(async (res) => {
      this.categories = res.data;
      for (let i = 0; i < this.categories.length; i++) {
        const cat = this.categories[i];
        this.blogService.getAllBlogsOf(cat).subscribe((res) => {
          res.data = res.data.map((post: any) => {
            post.daysAgoDate = this.utilService.computeNumberOfDaysString(post.createdAt);
            return post;
          });
          this.categoryPosts.set(cat, res.data);
        });
      }
    });
  }

  ngOnInit(): void {
    this.isMobile = this.appStateService.getIsMobileResolution();
    if (this.authService.isUserLoggedIn()) {
      this.userCookie = this.authService.getCookie('token');
      this.userName = this.authService.getCookie('username');
    }
  }

  deletePost(event: any, id: string) {
    event.preventDefault();
    event.stopPropagation();
    this.blogService.deleteBlog(id).subscribe((data) => {
      window.location.reload();
      this.toastrService.success('Post deleted sucessfully');
    }, (error) => { this.toastrService.error('There was an error deleting the post'); });
  }

  onSwipe(event: any) {
    if (this.isMobile) {
      const dir = Math.abs(event?.deltaX) > 40 ? (event?.deltaX > 0 ? DIRECTION.right : DIRECTION.left) : DIRECTION.right;
      const newRoute = this.swipeRoute.getNextSwipeRoute('/blog', dir);
      this.router.navigateByUrl(newRoute);
    }
  }

}
