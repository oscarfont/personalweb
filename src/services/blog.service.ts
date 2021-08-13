import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseURL: string = "http://localhost:3000/";
  categories = ["IT Blog", "Restaurant Review"];

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { 
    //this.categories = ["IT Blog", "Restaurant Review"];
  }

  getAllBlogs(){
    var httpReqs = [];
    for (let i = 0;  i < this.categories.length; i++) {
      let params = new HttpParams({
        fromString: `category=${this.categories[i]}`
      });
      //params.append("category", this.categories[i]);
      console.log(this.categories[i]);
      httpReqs.push(this.http.get<any>(this.baseURL + 'blog/getBlogs', {headers: this.httpHeader, params: params}));
    }
    return httpReqs;
  }

  getBlogDetail(categoryName,blogId){
    let params = new HttpParams({
      fromString: `category=${categoryName}&id=${blogId}`
    });
    return this.http.get<any>(this.baseURL + 'blog/getBlogDetail', {headers: this.httpHeader, params: params});
  }
}
