import {
  Component,
  OnInit,
  Input,
  AfterContentChecked,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SortBy } from 'src/app/models';
import { Transaction } from '../../dashboard-models';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent
  implements
    OnInit,
    AfterContentChecked,
    AfterContentInit,
    OnChanges,
    OnDestroy
{
  // @Input('dashWorker') worker: DashboardWorkerService;
  @Input() transactions: Transaction[] | undefined;
  private fetch: Subscription;

  constructor(private worker: DashboardWorkerService) {}
  ngOnDestroy(): void {
    this.fetch?.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('LEDGER CHANGES', changes);
  }

  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {
    this.worker.fetchTransactions().subscribe((trans: Transaction[]) => {
      this.transactions = trans;
    });
  }

  ngOnInit(): void {
    this.worker.setSorting(SortBy.none);
  }
}
