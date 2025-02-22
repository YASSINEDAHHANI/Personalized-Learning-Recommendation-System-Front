import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../modules/course.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  userId: any = StorageService.getUserId();  // Get user ID
  ngOnInit(): void {
    //this.fetchTopCourses(); // Assuming this fetches top courses
    }
  constructor(private router: Router) {}
  goToRecommendation() {
    this.router.navigate(['/recommendation']);
  }
  
}
