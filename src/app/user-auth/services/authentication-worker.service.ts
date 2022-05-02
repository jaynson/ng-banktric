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
  loggedinAccount: Account | undefined;

  constructor(private http: HttpClient) {}

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
    return this.accountsList;
  }

  loadFromLocalStorage(data: string): void {
    this.accountsList = JSON.parse(data);
    console.log('LOCALLL', this.accountsList);
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
      });
  }

  login(username: string, pin: string): boolean {
    // this.loggedinAccount = undefined;
    this.loggedinAccount = this.accountsList.find(
      (acc) => acc.username === username && acc.pin === Number(pin)
    );

    return this.loggedinAccount ? true : false;
  }

  getLoggedinAccount(): Account | undefined {
    return this.loggedinAccount;
  }
}
