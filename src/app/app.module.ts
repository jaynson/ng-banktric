import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BalanceComponent } from './components/balance/balance.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { SummaryComponent } from './components/summary/summary.component';
import { UserAuthModule } from './user-auth/user-auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BalanceComponent,
    LedgerComponent,
    TransactionComponent,
    SummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, UserAuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
