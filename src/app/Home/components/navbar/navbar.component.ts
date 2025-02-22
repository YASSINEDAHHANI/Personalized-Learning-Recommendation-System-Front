import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  isLoggedIn(): boolean {
    return StorageService.isUserLoggedIn() || StorageService.isAdminLoggedIn();//////////////////////
  }

  ngOnInit(): void {
    this.updateNavbar(); // Check role at startup

    // Listen for route changes and update navbar dynamically
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbar();
      }
    });
  }

  updateNavbar(): void {
    this.isAdmin = StorageService.isAdminLoggedIn();
    console.log("Admin Logged In? ", this.isAdmin); // Debugging log
    console.log("Stored Role: ", StorageService.getUserRole()); // Check role stored in localStorage
    this.cdRef.detectChanges(); // Ensure navbar updates immediately
  }

  isAdminLoggedIn(): boolean {
    return this.isAdmin;
  }

  logout(): void {
    localStorage.clear();////////////////////////////
    StorageService.logout();
    this.updateNavbar();
    this.router.navigate(['/login']);
  }
}
