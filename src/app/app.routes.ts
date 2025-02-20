import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { RecommendationComponent } from './modules/user/components/recommendation/recommendation.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './Home/components/home/home.component';
import { EnrollCourseComponent } from './Home/components/enroll-course/enroll-course.component';

export const routes: Routes = [
    { path: "login" , component: LoginComponent},
    { path: "signup" , component: SignupComponent},
    { path: "recommendation" , component: RecommendationComponent},
    {path:"home" , component: HomeComponent},
    { path: 'enrollments', component: EnrollCourseComponent}, //},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
