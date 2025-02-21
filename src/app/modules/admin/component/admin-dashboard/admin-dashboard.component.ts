import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../service/admin-dashboard.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollService } from '../../../../service/enroll.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  userEnrolledCourses: { [key: number]: any[] } = {}; // Initialize as an empty object
  searchQuery: string = '';
  searchBy: string = 'username';
  errorMessage: string = '';

  constructor(private adminService: AdminDashboardService, private enrollService: EnrollService) {}

  ngOnInit(): void {
    this.loadUsersWithEnrolledCourses();
  }

  loadUsersWithEnrolledCourses(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        users.forEach(user => {
          this.userEnrolledCourses[user.id] = [];
          this.loadEnrolledCourses(user.id);
        });
      },
      error: (err) => {
        this.errorMessage = 'Error loading users: ' + err.message;
      }
    });
  }

  loadEnrolledCourses(userId: number): void {
    this.enrollService.getEnrolledCourses(userId).subscribe({
      next: (courses) => {
        this.userEnrolledCourses[userId] = courses ?? []; // Ensure an empty array if no courses exist
      },
      error: () => {
        this.userEnrolledCourses[userId] = []; // Ensure safety in case of an error
      }
    });
  }

  searchUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.loadUsersWithEnrolledCourses();
      return;
    }

    if (this.searchBy === 'username') {
      this.adminService.searchUsersByUsername(this.searchQuery).subscribe({
        next: (users) => {
          this.users = users;
          users.forEach(user => {
            this.userEnrolledCourses[user.id] = []; // Ensure safety
            this.loadEnrolledCourses(user.id);
          });
        },
        error: (err) => {
          this.errorMessage = 'Error searching users: ' + err.message;
        }
      });
    }
  }
}
