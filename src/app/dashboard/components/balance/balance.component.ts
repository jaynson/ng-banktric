import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, AfterViewChecked {
  balance: string | undefined;
  date: string;
  constructor(private worker: DashboardWorkerService) {}
  ngAfterViewChecked(): void {
    this.balance = this.worker.formatNumber(this.worker.getBalance()!);
    this.date = this.worker.simpleFormatDate();
  }

  ngOnInit(): void {}
}
