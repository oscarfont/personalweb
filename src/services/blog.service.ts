import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseURL: string = `http://${environment.backendHost}:3000/`;
  postMedia: Array<string>;

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    this.postMedia = new Array<string>();
  }

  getAllCategories() {
    return this.http.get<any>(this.baseURL + 'blog/categories/get/all', { headers: this.httpHeader });
  }

  getAllBlogsOf(category: string) {
    let params = new HttpParams({
      fromString: `category=${category}`
    });
    return this.http.get<any>(this.baseURL + 'blog/get/all', { headers: this.httpHeader, params: params });
  }

  getBlogDetail(categoryName: string, blogId: string) {
    const body = { category: categoryName, id: blogId };
    return this.http.post<any>(this.baseURL + 'blog/get/detail', body, { headers: this.httpHeader });
  }

  publishBlog(title: string, category: string, summary: string, content: string, media: Array<string>) {
    let params = new HttpParams({
      fromString: `category=${category}`
    });

    const data = { 'title': title, 'summary': summary, 'content': content, 'media': media };

    return this.http.post<any>(this.baseURL + 'blog/publish', data, { headers: this.httpHeader, params: params });
  }

  deleteBlog(id: string) {
    const options = {
      headers: this.httpHeader
    };

    return this.http.delete<any>(this.baseURL + 'blog/remove/' + id, options);
  }

  addPostMedia(itemName: string) {
    this.postMedia.push(itemName);
  }

  removePostMedia(itemName: string) {
    this.postMedia.filter((value) => { return itemName !== value });
  }

  getPostMedia() { return this.postMedia; }
}
