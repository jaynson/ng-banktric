import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { SortBy } from 'src/app/models';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, AfterContentChecked {
  depositTotal: string | undefined;
  withdrawTotal: string | undefined;
  interest: string | undefined;

  constructor(private worker: DashboardWorkerService) {}
  ngAfterContentChecked(): void {
    this.depositTotal = this.worker.formatNumber(
      this.worker.getTotalDeposit()!
    );
    this.withdrawTotal = this.worker.formatNumber(
      this.worker.getTotalWithdrawal()!
    );
    this.interest = this.worker.formatNumber(this.worker.getInterest()!);
  }

  sortTransactions() {
    if (this.worker.Sorting() == SortBy.none)
      this.worker.setSorting(SortBy.asc);
    else if (this.worker.Sorting() == SortBy.asc)
      this.worker.setSorting(SortBy.des);
    else this.worker.setSorting(SortBy.none);

    // this.worker.fetchTransactions()
  }

  ngOnInit(): void {}
}
