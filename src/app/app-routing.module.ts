import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverComponent } from './cover/cover.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { NewPostComponent } from './blog/new-post/new-post.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CoverComponent, data: { animation: 'HomePage' } },
  { path: 'portfolio', component: PortfolioComponent, data: { animation: 'PortfolioPage' } },
  { path: 'blog', component: BlogComponent, data: { animation: 'BlogPage' } },
  { path: 'detail/:category/:id', component: BlogDetailComponent, data: { animation: 'BlogPage' } },
  { path: 'newpost', component: NewPostComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage' } },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
