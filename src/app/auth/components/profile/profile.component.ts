import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../modules/user/services/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  updatedUser: any = { username: '', email: '', password: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = StorageService.getUserId();
    this.userService.getUserProfile(userId).subscribe((data) => {
      this.user = data;
      this.updatedUser.username = data.username;
      this.updatedUser.email = data.email;
    });
  }

  updateUser(): void {
    const userId = StorageService.getUserId();
    if (!this.updatedUser.password) delete this.updatedUser.password;

    this.userService.updateUser(userId, this.updatedUser).subscribe(
      () => {
        alert('Profile updated successfully!');
        this.loadUserProfile();
      },
      () => alert('Failed to update profile.')
    );
  }

  
}
