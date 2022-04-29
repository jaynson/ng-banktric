import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthModule } from './user-auth/user-auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { AuthenticationWorkerService } from './user-auth/services/authentication-worker.service';
import { DashboardWorkerService } from './dashboard/services/dashboard-worker.service';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, UserAuthModule, DashboardModule],
  providers: [AuthenticationWorkerService, DashboardWorkerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
