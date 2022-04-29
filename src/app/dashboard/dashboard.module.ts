import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './components/main-view/main-view.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { SummaryComponent } from './components/summary/summary.component';
import { BalanceComponent } from './components/balance/balance.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { LoanComponent } from './components/loan/loan.component';
import { CloseComponent } from './components/close/close.component';
import { TimeoutComponent } from './components/timeout/timeout.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationWorkerService } from '../user-auth/services/authentication-worker.service';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainViewComponent,
    LedgerComponent,
    TransactionComponent,
    SummaryComponent,
    BalanceComponent,
    TransferComponent,
    LoanComponent,
    CloseComponent,
    TimeoutComponent,
    WelcomeBarComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  // providers: [AuthenticationWorkerService],
})
export class DashboardModule {}
