import { Injectable } from '@angular/core';
import { from, Observable, of, Subscription } from 'rxjs';
import { Account, SortBy } from 'src/app/models';
import { AuthenticationWorkerService } from 'src/app/user-auth/services/authentication-worker.service';
import { Transaction } from '../dashboard-models';

@Injectable({
  providedIn: 'root',
})
export class DashboardWorkerService {
  simpleFormatDate(): string {
    const dateOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat(this.account.locale, dateOptions).format(
      new Date()
    );
  }

  formatTransactionDate(date: string) {
    const calcDaysPassed = (date1: number, date2: number) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(Date.now(), Date.parse(date));

    let result = '';
    if (daysPassed === 0) result = 'Today';
    else if (daysPassed === 1) result = 'Yesterday';
    else if (daysPassed <= 14) result = `${daysPassed} days ago`;
    else {
      result = new Intl.DateTimeFormat(this.account.locale).format(
        new Date(date)
      );
    }
    return result;
  }
  private amountList: number[] | undefined;
  private account: Account;
  private accountList: Account[];
  private sorting: SortBy = SortBy.none;
  // private authSub: Subscription;
  constructor(private authService: AuthenticationWorkerService) {
    // this.getTransactions();
  }

  setSorting(type: SortBy) {
    this.sorting = type;
  }

  Sorting(): SortBy {
    return this.sorting;
  }

  loadAccount(account: Account | undefined): void {
    if (!account) return;
    this.account = account;
  }

  loadAccountList(accountList: Account[]): void {
    if (!accountList) return;
    this.accountList = accountList;
  }

  getTransactions(): Transaction[] | undefined {
    return [...this.account.transactions].reverse();
  }

  fetchTransactions(): Observable<Transaction[]> {
    // return from([...this.account.transactions].reverse());
    let arr: Transaction[];
    if (this.sorting === SortBy.asc) {
      arr = [...this.account.transactions]
        .reverse()
        .sort((a: Transaction, b: Transaction) => a.amount - b.amount);
    } else if (this.sorting === SortBy.des) {
      arr = [...this.account.transactions]
        .reverse()
        .sort((a: Transaction, b: Transaction) => b.amount - a.amount);
    } else {
      arr = [...this.account.transactions].reverse();
    }
    return new Observable((subscriber) => {
      subscriber.next(arr);
    });
  }

  requestLoan(loanAmt: number): boolean {
    if (loanAmt > 0 && this.amountList?.some((amt) => amt >= loanAmt * 0.1)) {
      const loanDate = new Date().toISOString();
      setTimeout(() => {
        this.account.transactions.push({
          amount: loanAmt,
          date: loanDate,
        });
      }, 2500);
      return true;
    }
    return false;
  }

  transfer(receiver: string, amount: number): boolean {
    // const receiverAccount = this.authService.fetchAccountWithUsername(receiver);
    const receiverAccount = this.accountList.find(
      (acc) => acc.username === receiver
    );
    const bal = this.getBalance();
    if (
      amount > 0 &&
      receiverAccount &&
      bal! >= amount &&
      receiverAccount?.username !== this.account.username
    ) {
      const txDate = new Date().toISOString();
      receiverAccount.transactions.push({ amount: amount, date: txDate });
      this.account.transactions.push({ amount: -amount, date: txDate });
      return true;
    }
    return false;
  }

  currentAccount(): Account {
    return this.account;
  }

  getBalance(): number | undefined {
    // console.log('AMTLISTDAsh', this.authWorker.dummyAccount.transactions);
    this.amountList = this.account.transactions.map((amt) => amt.amount);
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

  // FOrmat Number
  formatNumber(value: number): string {
    return new Intl.NumberFormat(this.account.locale, {
      style: 'currency',
      currency: `${this.account.currency}`,
    }).format(value);
  }

  //CLose Account
  closeAccount(uName: string, pin: string): boolean {
    if (uName === this.account.username && Number(pin) === this.account.pin) {
      const ind = this.accountList.findIndex(
        (acc) => acc.username === this.account.username
      );

      console.log(ind);
      this.authService.logout();

      //Delete Account
      this.accountList.splice(ind, 1);

      return true;
    }
    return false;
  }
}
