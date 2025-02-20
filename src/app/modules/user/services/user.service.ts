import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';
  constructor(private http:HttpClient) { }

  savePreferences(preferences:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/preferences/2`, preferences);
  }

  // getCourseRecommendations(preferences: any): Observable<string> {
  //   return this.http.post<string>(`${this.apiUrl}/courses`, preferences);
  // }
  getCourseRecommendations(preferences: { level: string; skills: string[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses/2`, preferences);
  }

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }


}