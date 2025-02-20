import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm! : FormGroup;
  hidePassword = true;
  
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private snackbar: MatSnackBar,
    private router:Router){
    this.loginForm=this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
    })
  }
  
  togglePasswordVisibility(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.hidePassword = !this.hidePassword;
  }
  onSubmit()
  {
    console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value).subscribe((res) => {
    console.log(res);
    if(res.userId != null)
    {
      const user={
        id: res.userId,
        role: res.userRole
      }
      StorageService.saveUser(user);
      StorageService.saveToken(res.jwt);

      if(StorageService.isAdminLoggedIn())
        this.router.navigateByUrl("/home");
      else if(StorageService.isUserLoggedIn())
        this.router.navigateByUrl("/home");

      this.snackbar.open("Login successful","Close",{duration:5000});
    }else
    {
      this.snackbar.open("Invalid credentials","Close",{duration: 5000,panelClass:"error-snackbar"});

    }
  })
  }
}
