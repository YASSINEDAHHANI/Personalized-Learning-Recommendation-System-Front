import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-recommendation',
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent implements OnInit {
  preferences = { level: '', skills: '' }; // 'skills' is a comma-separated string
  recommendations: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

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
}
