import { Component, OnInit } from '@angular/core';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  depositTotal: number | undefined;
  withdrawTotal: number | undefined;
  interest: number | undefined;

  constructor(private worker: DashboardWorkerService) {}

  ngOnInit(): void {
    this.depositTotal = this.worker.getTotalDeposit();
    this.withdrawTotal = this.worker.getTotalWithdrawal();
    this.interest = this.worker.getInterest();
  }
}
