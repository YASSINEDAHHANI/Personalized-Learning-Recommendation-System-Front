import { Component, OnInit } from '@angular/core';
import { EnrollService } from '../../../service/enroll.service';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Course {
  skill: string;
  beginner?: any;
  intermediate?: any;
  advanced?: any;
}

@Component({
  selector: 'app-random-recommendation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './random-recommendation.component.html',
  styleUrl: './random-recommendation.component.scss'
})
export class RandomRecommendationComponent implements OnInit {
  courses: Course[] = [];
  userId: any;

  constructor(private courseService: EnrollService) {}

  ngOnInit() {
    this.userId = StorageService.getUserId();
    if (this.userId) {
      this.fetchCourses(this.userId);
    }
  }

  fetchCourses(userId: number) {
    this.courseService.getRecommendedCourses(userId).subscribe(response => {
      this.courses = this.transformData(response);
    });
  }

  transformData(data: any): Course[] {
    return Object.keys(data)
      .map(skill => ({
        skill,
        beginner: data[skill]?.beginner || null,
        intermediate: data[skill]?.intermediate || null,
        advanced: data[skill]?.advanced || null
      }))
      .filter(course => course.beginner || course.intermediate || course.advanced); // Remove empty skills
  }
  viewOnCoursera(courseTitle: string) {
    const encodedTitle = encodeURIComponent(courseTitle); // Encode for URL safety
    const courseraUrl = `https://www.coursera.org/search?query=${encodedTitle}`;
    window.open(courseraUrl, "_blank"); // Open in a new tab
  }
}
