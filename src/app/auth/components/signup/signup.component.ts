import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm! : FormGroup;
  hidePassword = true;
  
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private snackbar: MatSnackBar,
    private router:Router)
    {
    this.signupForm=this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      position: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }
  
  togglePasswordVisibility(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.hidePassword = !this.hidePassword;
  }
  onSubmit()
  {
    //console.log(this.signupForm.value);
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    if(password !== confirmPassword){
      this.snackbar.open("Passwords do not match","Close",{duration:5000,panelClass:"error-snackbar"});
      return;
    }
  
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null)
      {
        this.snackbar.open("Signup successful","Close",{duration:5000});
        this.router.navigateByUrl("/login");
      }else
      {
        this.snackbar.open("Signup fialed. Try again","Close",{duration: 5000,panelClass:"error-snackbar"});
  
      }
    })
  
  }
}
