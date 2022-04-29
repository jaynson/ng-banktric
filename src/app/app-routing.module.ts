import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './dashboard/components/main-view/main-view.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './user-auth/components/nav/nav.component';

const routes: Routes = [
  //Route to the home page
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'accounts/:user',
    component: MainViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
