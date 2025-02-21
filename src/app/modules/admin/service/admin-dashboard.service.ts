import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = 'http://localhost:8080/api/admin'; // Backend API URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  searchUsersByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/search/username/${username}`);
  }

  searchUsersByEnrolledCourse(courseTitle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/search/enrolled-course/${courseTitle}`);
  }
}
