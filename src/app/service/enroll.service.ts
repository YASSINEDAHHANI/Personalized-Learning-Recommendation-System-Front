import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService{
  private apiUrl = 'http://localhost:8080/api/enrolled-courses'; // Adjust if needed

  constructor(private http: HttpClient) {}

  enrollInCourse(Title:any, userId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/enroll?title=${Title}&userId=${userId}`, {});
  }

  getEnrolledCourses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteEnrolledCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`);
  }

  searchEnrolledCourses(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?title=${title}`);
  }

  updateProgress(courseId: number, currentProgress: number): Observable<void> {
    const newProgress = Math.min(100, currentProgress + 10); // Increase by 10%, max 100%
    return this.http.patch<void>(`${this.apiUrl}/${courseId}/progress?progress=${newProgress}`, {});
  }
  getCompletedCourses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/completed/${userId}`);
  }
  ////////////////////////////////////////////////////////////
  private apiUrl2 = 'http://localhost:8080/api/top-courses/'; // Base API URL

  getRecommendedCourses(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}${userId}`, {});
  }
  
}