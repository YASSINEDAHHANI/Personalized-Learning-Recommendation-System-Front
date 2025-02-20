import { Component } from '@angular/core';
import { EnrollService } from '../../../service/enroll.service';

@Component({
  selector: 'app-enroll-course',
  imports: [],
  templateUrl: './enroll-course.component.html',
  styleUrl: './enroll-course.component.scss'
})
export class EnrollCourseComponent {
  enrolledCourses: any[] = [];
  userId: number = 1; // Example user ID, replace with dynamic user data

  constructor(private enrollService: EnrollService) {}

  ngOnInit(): void {
    this.loadEnrolledCourses();
  }

  loadEnrolledCourses(): void {
    this.enrollService.getEnrolledCourses(this.userId).subscribe((data) => {
      this.enrolledCourses = data;
    });
  }

  enroll(courseId: number): void {
    this.enrollService.enrollInCourse(courseId, this.userId).subscribe(() => {
      alert('Enrolled successfully!');
      this.loadEnrolledCourses(); // Refresh the list
    });
  }

  updateProgress(courseId: number, currentProgress: number): void {
    const newProgress = Math.min(100, currentProgress + 10); // Increase by 10%, max 100%
    this.enrollService.updateProgress(courseId, newProgress).subscribe(() => {
      alert(`Progress updated to ${newProgress}%`);
      this.loadEnrolledCourses();
    });
  }
}
