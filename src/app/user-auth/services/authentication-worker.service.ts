import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
// import { Observable } from 'rxjs';
import { Account } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationWorkerService {
  private accountsList: Account[];
  private sub: Subscription;
  dummyAccount: Account;
  loggedinAccount: Account | undefined;

  constructor(private http: HttpClient) {
    console.log('FROM AUTH SERVICE');
  }

  unsubscribeService() {
    this.sub?.unsubscribe();
  }

  logout() {
    console.log('Logging out Auth Service');
    this.loggedinAccount = undefined;
  }

  fetchAccountWithUsername(uName: string): Account | undefined {
    return this.accountsList.find((acc) => acc.username === uName);
  }

  getAccountsList(): Account[] {
    console.log('In the SERVICE', this.accountsList);
    return this.accountsList;
  }

  getCurrentAccount(): Observable<Account> {
    console.log('DUMMMMYYYY', this.dummyAccount);
    return of(this.dummyAccount);
  }

  jsonAccountsRetriever(): void {
    this.sub = this.http
      .get<Array<Account>>('/assets/models/accounts.json')
      .subscribe((accounts: Array<Account>) => {
        this.accountsList = accounts.map((acc) => {
          let username = acc.owner
            .toLowerCase()
            .split(' ')
            .map((name) => name[0])
            .join('');
          return { ...acc, username: username };
        });
        console.log('YTOUU', this.accountsList);
        this.dummyAccount = this.accountsList[2];
        console.log('TIEE', this.dummyAccount);
      });
  }

  login(username: string, pin: string): boolean {
    // this.loggedinAccount = undefined;
    console.log('USerNAme', 'PAsswor', username, pin);
    this.loggedinAccount = this.accountsList.find(
      (acc) => acc.username === username && acc.pin === Number(pin)
    );

    console.log('WHOIS', this.loggedinAccount);
    return this.loggedinAccount ? true : false;
  }

  getLoggedinAccount(): Account | undefined {
    // return this.loggedinAccount;
    return this.loggedinAccount;
  }
}
