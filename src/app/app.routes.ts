import { Routes } from '@angular/router';
import { SurveyComponent } from './Register/survey/survey.component';

export const routes: Routes = [
    { path: 'sign-in/:id', component: SurveyComponent },
    { path: 'sign-in', component: SurveyComponent },
    { path: 'survey', redirectTo: 'sign-in' },
    { path: 'survey/:id', redirectTo: 'sign-in/:id', pathMatch: 'full' },
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: '**', redirectTo: '/sign-in' }
];
