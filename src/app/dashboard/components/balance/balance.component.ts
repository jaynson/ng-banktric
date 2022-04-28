import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from '../../dashboard-models';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, AfterViewInit {
  balance: number | undefined;
  balanceSub: Subscription;
  constructor(private worker: DashboardWorkerService) {}
  ngAfterViewInit(): void {
    // this.balance = this.worker.getBalance();

    console.log(this.balance);
  }

  ngOnInit(): void {
    this.balance = this.worker.getBalance();
    console.log('READD', this.balance);
    // this.balanceSub = this.worker
    //   .getBalance()
    //   .subscribe((amountList: Array<Transaction> | undefined) => {
    //     console.log('AMOUNTLISTTOU', amountList);
    //   });
  }
}
