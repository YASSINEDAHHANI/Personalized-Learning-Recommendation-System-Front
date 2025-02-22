import { Component } from '@angular/core';
import { EnrollService } from '../../../service/enroll.service';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enroll-course',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './enroll-course.component.html',
  styleUrl: './enroll-course.component.scss'
})
export class EnrollCourseComponent {
  enrolledCourses: any[] = [];
  userId: any = StorageService.getUserId();
  searchTitle: string = '';
  filteredCourses: any[] = [];

  constructor(private enrollService: EnrollService) {}

  ngOnInit(): void {
    this.loadEnrolledCourses();
  }

  loadEnrolledCourses(): void {
    this.enrollService.getEnrolledCourses(this.userId).subscribe((data) => {
      this.enrolledCourses = data;
    });
  }
  filterCourses(): void {
    this.filteredCourses = this.searchTitle.trim()
      ? this.enrolledCourses.filter(course =>
          course.title.toLowerCase().includes(this.searchTitle.toLowerCase())
        )
      : this.enrolledCourses;
  }

  searchCourses(): void {
    if (this.searchTitle.trim() === '') {
      this.loadEnrolledCourses();
      return;
    }

    this.enrollService.searchEnrolledCourses(this.searchTitle).subscribe({
      next: (data) => (this.enrolledCourses = data),
      error: (error) => console.error('Error searching courses', error)
    });
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to remove this course?')) {
      this.enrollService.deleteEnrolledCourse(courseId).subscribe({
        next: () => {
          alert('Course removed successfully!');
          this.loadEnrolledCourses();
        },
        error: (error) => console.error('Error deleting course', error)
      });
    }
  }

  loading = false;

updateProgress(courseId: number, change: number, currentProgress: number): void {
    if (this.loading) return; // Prevent duplicate clicks
    this.loading = true;
    currentProgress = currentProgress-10;
    const newProgress = Math.max(0, Math.min(100, currentProgress + change)); 

    this.enrollService.updateProgress(courseId, newProgress).subscribe({
      next: () => {
        this.loadEnrolledCourses(); 
        this.loading = false; 
      },
      error: (error) => {
        console.error('Error updating progress', error);
        this.loading = false;
      }
    });
}

  
}
