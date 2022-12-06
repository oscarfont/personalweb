import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  baseURL: string = "http://localhost:3000/";

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, comment: string) {
    const body = { 'from': email, 'subject': subject, 'text': comment };
    return this.http.post<any>(this.baseURL + 'utils/sendMail', body, { headers: this.httpHeader });
  }

  deleteImage(imageId: string) {
    const body = { src: imageId }
    return this.http.post<any>(this.baseURL + 'utils/deleteImage/', body);
  }

}
