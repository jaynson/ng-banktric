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
import { AuthenticationWorkerService } from '../user-auth/services/authentication-worker.service';

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
  ],
  imports: [CommonModule],
  providers: [AuthenticationWorkerService],
})
export class DashboardModule {}
