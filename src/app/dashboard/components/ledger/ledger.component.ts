import {
  Component,
  OnInit,
  Input,
  DoCheck,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Transaction } from '../../dashboard-models';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit, DoCheck {
  @Input() transactions: Transaction[] | undefined;

  constructor(private worker: DashboardWorkerService) {
    console.log('FIRST');
  }

  ngDoCheck(): void {
    this.transactions = this.worker.getTransactions();
    console.log('LEDGER', this.transactions);
  }

  ngOnInit(): void {
    // On load, retrive initial list of transactions
  }
}
