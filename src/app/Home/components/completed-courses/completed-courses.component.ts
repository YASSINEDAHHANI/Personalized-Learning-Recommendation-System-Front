import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollService } from '../../../service/enroll.service';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-completed-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './completed-courses.component.html',
  styleUrl: './completed-courses.component.scss'
})
export class CompletedCoursesComponent implements OnInit{

  completedCourses: any[] = [];
  userId: any = StorageService.getUserId();

  constructor(private enrollService: EnrollService) {}

  ngOnInit(): void {
    this.loadCompletedCourses();
  }

  loadCompletedCourses(): void {
    this.enrollService.getCompletedCourses(this.userId).subscribe({
      next: (data) => {
        console.log('Completed Courses:', data);
        this.completedCourses = data;
      },
      error: (err) => {
        console.error('Error fetching completed courses:', err);
      }
    });
  }
  viewOnCoursera(courseTitle: string) {
    const encodedTitle = encodeURIComponent(courseTitle); // Encode for URL safety
    const courseraUrl = `https://www.coursera.org/search?query=${encodedTitle}`;
    window.open(courseraUrl, "_blank"); // Open in a new tab
  }
}
