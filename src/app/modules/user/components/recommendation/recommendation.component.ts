import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { EnrollService } from '../../../../service/enroll.service';

@Component({
  selector: 'app-recommendation',
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent implements OnInit {
    Enroll(arg0: any) {
    throw new Error('Method not implemented.');
    }
  preferences = { level: '', skills: '' }; // 'skills' is a comma-separated string
  recommendations: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService,private storageService:StorageService,private enrollService:EnrollService) {}

  ngOnInit(): void {}

  submitPreferences(): void {
    const formattedPreferences = {
      level: this.preferences.level,
      skills: this.preferences.skills.split(',').map(skill => skill.trim()), // Convert string to array
    };

    this.userService.getCourseRecommendations(formattedPreferences).subscribe({
      next: (data) => {
        this.recommendations = data.sort(
          (a: any, b: any) => b.Final_Score - a.Final_Score
        );
      },
      error: (err) => (this.errorMessage = `Error: ${err.message}`),
    });
  }
  userId: number = 2;
  enroll(courseId: number | undefined): void {
    if (!courseId) {
      console.error('Error: Course ID is undefined!');
      alert('Error: Unable to enroll. Course ID is missing.');
      return;
    }
  
    console.log('Enrolling in Course:', courseId, 'for User:', this.userId);
  
    this.enrollService.enrollInCourse(courseId, this.userId).subscribe({
      next: () => {
        alert('Successfully Enrolled!');
      },
      error: (err) => {
        console.error('Enrollment Error:', err);
        alert('Enrollment failed. Check console for details.');
      }
    });
  }
  
}
