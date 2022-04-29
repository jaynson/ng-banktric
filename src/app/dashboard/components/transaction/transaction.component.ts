import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../dashboard-models';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, AfterContentChecked {
  @Input() transaction: Transaction;
  @Input() index: number;
  date: string;

  constructor(private dashService: DashboardWorkerService) {}
  ngAfterContentChecked(): void {
    this.date = this.dashService.formatTransactionDate(this.transaction.date);
  }

  ngOnInit(): void {}
}
