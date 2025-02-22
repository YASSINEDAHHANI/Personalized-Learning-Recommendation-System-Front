import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { EnrollService } from '../../../../service/enroll.service';
import { Router } from '@angular/router';

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
  showDropdown = false;
  levels = ['Beginner', 'Intermediate', 'Advanced'];
  filteredLevels = [...this.levels];

  constructor(private userService: UserService,private storageService:StorageService,private enrollService:EnrollService,
    private router:Router
  ) {}

  ngOnInit(): void {}
  filterLevels() {
    this.filteredLevels = this.levels.filter(level =>
      level.toLowerCase().includes(this.preferences.level.toLowerCase())
    );
  }

  selectLevel(level: string) {
    this.preferences.level = level;
    this.showDropdown = false;
  }

  hideDropdownWithDelay() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Delay to allow click event to be captured
  }

  submitPreferences(): void {
    const formattedPreferences = {
      level: this.preferences.level,
      skills: this.preferences.skills.split(',').map(skill => skill.trim()), // Convert string to array
    };

    this.userService.getCourseRecommendations(formattedPreferences,StorageService.getUserId()).subscribe({
      next: (data) => {
        this.recommendations = data.sort(
          (a: any, b: any) => b.Final_Score - a.Final_Score
        );
      },
      error: (err) => (this.errorMessage = `Error: ${err.message}`),
    });
  }
  
  enroll(Title: String): void {
    this.enrollService.enrollInCourse(Title, StorageService.getUserId()).subscribe({
      next: () => {
        alert('Successfully Enrolled!');
        this.router.navigate(['/enrollments']);
      }
    });
  }
  viewOnCoursera(courseTitle: string) {
    const encodedTitle = encodeURIComponent(courseTitle); // Encode for URL safety
    const courseraUrl = `https://www.coursera.org/search?query=${encodedTitle}`;
    window.open(courseraUrl, "_blank"); // Open in a new tab
  }
  
  
}
