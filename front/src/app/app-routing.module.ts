import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { CourseComponent } from './course/course.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { GenerateQuestionsComponent } from './generate-questions/generate-questions.component';
import { QuizComponent } from './quiz/quiz.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: "home", component: MainComponent },
  {path: "course/:course", component: CourseComponent},
  {path: "askQuestion", component: AskQuestionComponent},
  {path: "askNQuestion", component: GenerateQuestionsComponent},
  {path: "quiz/:course/:lection/:difficulty", component: QuizComponent},
  {path: "summary", component: SummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
