import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService{
  private apiUrl = 'http://localhost:8080/api/enrolled-courses'; // Adjust if needed

  constructor(private http: HttpClient) {}

  enrollInCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/enroll?courseId=${courseId}&userId=${userId}`, {});
  }

  getEnrolledCourses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateProgress(courseId: number, progress: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${courseId}/progress?progress=${progress}`, {});
  }
}
