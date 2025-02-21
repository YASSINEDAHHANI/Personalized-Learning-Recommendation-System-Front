import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';
  private preferencesUrl = 'http://localhost:8080/api/user-preferences';
  constructor(private http:HttpClient) { }

  savePreferences(preferences:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/preferences/2`, preferences);
  }

  // getCourseRecommendations(preferences: any): Observable<string> {
  //   return this.http.post<string>(`${this.apiUrl}/courses`, preferences);
  // }
  getCourseRecommendations(preferences: { level: string; skills: string[] },id:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses/`+id, preferences);
  }

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  ////////////////////////
  getUserProfile(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/getUser/${userId}`);
  }

  // Update User Profile
  updateUser(userId: any, updateData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/update/${userId}`, updateData);
  }


}