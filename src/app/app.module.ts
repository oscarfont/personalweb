import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoverComponent } from './cover/cover.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth/auth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { NewPostComponent } from './blog/new-post/new-post.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxEchartsModule } from 'ngx-echarts';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import { ColleaguesCommentsComponent } from './cover/colleagues-comments/colleagues-comments.component';
import Hammer from 'hammerjs';
import { HammerModule } from "../../node_modules/@angular/platform-browser";
import { ExperienceCarrouselComponent } from './cover/experience-carrousel/experience-carrousel.component';
import { HighlightProjectsComponent } from './cover/highlight-projects/highlight-projects.component';
import { FooterComponent } from './footer/footer.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    NavbarComponent,
    ContactComponent,
    PortfolioComponent,
    BlogComponent,
    NotfoundComponent,
    AuthComponent,
    BlogDetailComponent,
    NewPostComponent,
    ColleaguesCommentsComponent,
    ExperienceCarrouselComponent,
    HighlightProjectsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    HammerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    HttpClientModule,
    DragDropModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
