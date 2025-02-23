import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { RecommendationComponent } from './modules/user/components/recommendation/recommendation.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './Home/components/home/home.component';
import { EnrollCourseComponent } from './Home/components/enroll-course/enroll-course.component';
import { CompletedCoursesComponent } from './Home/components/completed-courses/completed-courses.component';
import { AdminDashboardComponent } from './modules/admin/component/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { FooterComponent } from './Home/components/footer/footer.component';
import { AuthGuard } from './auth/services/auth/auth.guard';
import { AdminGuard } from './auth/services/auth/admin.guard';
import { RandomRecommendationComponent } from './Home/components/random-recommendation/random-recommendation.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },

    { path: "recommendation", component: RecommendationComponent, canActivate: [AuthGuard] },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "enrollments", component: EnrollCourseComponent, canActivate: [AuthGuard] },
    { path: "competedcourses", component: CompletedCoursesComponent, canActivate: [AuthGuard] },
    { path: "randomRecommendation", component: RandomRecommendationComponent, canActivate: [AuthGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },

    { path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [AdminGuard] },



    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },

    { path:"footer" , component: FooterComponent},


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
