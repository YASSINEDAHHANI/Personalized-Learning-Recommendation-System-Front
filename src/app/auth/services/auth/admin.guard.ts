import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { StorageService } from "../storage/storage.service";

@Injectable({
    providedIn: 'root',
  })
  export class AdminGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(): boolean {
      if (StorageService.isAdminLoggedIn()) {
        return true; // Allow access
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }