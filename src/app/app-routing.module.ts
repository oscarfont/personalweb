import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverComponent } from './cover/cover.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: CoverComponent, data: {animation: 'AboutPage'}},
  { path: 'portfolio', component: PortfolioComponent, data: {animation: 'AboutPage'}},
  { path: 'blog', component: BlogComponent, data: {animation: 'FilterPage'} },
  { path: 'contact', component: ContactComponent, data: {animation: 'HomePage'}},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
