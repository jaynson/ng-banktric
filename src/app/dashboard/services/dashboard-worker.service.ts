import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Account } from 'src/app/models';
import { AuthenticationWorkerService } from 'src/app/user-auth/services/authentication-worker.service';
import { Transaction } from '../dashboard-models';

@Injectable({
  providedIn: 'root',
})
export class DashboardWorkerService {
  // private transactionList: Transaction[] | undefined;
  private amountList: number[] | undefined;
  private account: Account;
  // private authSub: Subscription;
  constructor(private authWorker: AuthenticationWorkerService) {
    // this.getTransactions();
    this.userAccount();
    console.log('FROM DASH SERVICE');
  }

  getTransactions(): Transaction[] | undefined {
    return this.authWorker.dummyAccount.transactions.reverse();
    // this.transactionList = this.authWorker.dummyAccount?.transactions.reverse();
    // this.transactionList = this.authWorker
    //   .getLoggedinAccount()
    //   ?.transactions.reverse();
    // return this.transactionList;
  }

  userAccount(): void {
    this.authWorker.getCurrentAccount().subscribe((acc: Account) => {
      console.log('SUBSCRIBED', acc);
      this.account = acc;
      console.log('LEEEEEEE', this.account);
    });
  }

  currentAccount(): Account {
    return this.account;
  }

  // balance(): Observable<Transaction[] | undefined> {
  //   this.amountList = this.authWorker.dummyAccount?.transactions.map((amt) => amt.amount);
  //   console.log('BALLL', this.amountList);
  //   return of(this.transactionList);
  // }

  getBalance(): number | undefined {
    console.log('AMTLISTDAsh', this.authWorker.dummyAccount.transactions);
    this.amountList = this.authWorker.dummyAccount.transactions.map(
      (amt) => amt.amount
    );
    return this.amountList?.reduce((acc, mov) => acc + mov, 0);
  }

  getTotalDeposit(): number | undefined {
    return this.amountList
      ?.filter((amt) => amt > 0)
      .reduce((acc, mov) => acc + mov, 0);
  }

  getTotalWithdrawal(): number | undefined {
    return this.amountList
      ?.filter((amt) => amt < 0)
      .reduce((acc, mov) => acc + mov, 0);
  }

  getInterest(): number | undefined {
    return this.amountList
      ?.filter((amt) => amt > 0)
      .map((deposit) => (deposit * 1.5) / 100)
      .filter((intr) => intr >= 1)
      .reduce((acc, mov) => acc + mov, 0);
  }
}
