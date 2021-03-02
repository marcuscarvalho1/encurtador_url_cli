import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RedirectComponent } from './views/redirect/redirect.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', component: RedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
