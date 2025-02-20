import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';
import { NavbarComponent } from "./Home/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent {
  showSidebar = true;
  constructor(public router: Router) {this.router.events.subscribe(() => {
    const currentRoute = this.router.url;
    // Hide sidebar for login and signup routes
    this.showSidebar = !(currentRoute.includes('/login') || currentRoute.includes('/signup'));
  });}
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
