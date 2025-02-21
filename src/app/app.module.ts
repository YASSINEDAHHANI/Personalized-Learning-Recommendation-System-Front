import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { SignupComponent } from "./auth/components/signup/signup.component";
import { RecommendationComponent } from "./modules/user/components/recommendation/recommendation.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HomeComponent } from "./Home/components/home/home.component";
import { NavbarComponent } from "./Home/components/navbar/navbar.component";
import { EnrollCourseComponent } from "./Home/components/enroll-course/enroll-course.component";
import { CompletedCoursesComponent } from "./Home/components/completed-courses/completed-courses.component";
import { AdminDashboardComponent } from "./modules/admin/component/admin-dashboard/admin-dashboard.component";
import { ProfileComponent } from "./auth/components/profile/profile.component";


@NgModule({
    declarations: [
        // AppComponent,
        // LoginComponent,
        // SignupComponent,
        // RecommendationComponent
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule, 
        FormsModule,
        AppComponent,
        LoginComponent,
        SignupComponent,
        RecommendationComponent,
        HomeComponent,
        NavbarComponent,
        EnrollCourseComponent,
        CompletedCoursesComponent,
        AdminDashboardComponent,
        ProfileComponent
        

    ],
    providers: [provideHttpClient()],
    //bootstrap: [AppComponent]
})
export class AppModule { }