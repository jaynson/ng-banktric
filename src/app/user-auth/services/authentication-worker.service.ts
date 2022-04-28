import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Observable } from 'rxjs';
import { Account } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationWorkerService {
  private accountsList: Account[];
  dummyAccount: Account;
  loggedinAccount: Account | undefined;

  constructor(private http: HttpClient) {
    this.http
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
        this.dummyAccount = this.accountsList[0];
        console.log('TIEE', this.dummyAccount);
      });
  }

  getAccountsList(): Account[] {
    return this.accountsList;
  }

  getCurrentAccount(): Observable<Account> {
    console.log('DUMMMMYYYY', this.dummyAccount);
    return of(this.dummyAccount);
  }

  jsonAccountsRetriever(): void {
    // console.log(
    //   'JSOON',
    //   this.http.get<Array<Account>>('/assets/models/accounts.json').subscribe()
    // );
    // this.http
    //   .get<Array<Account>>('/assets/models/accounts.json')
    //   .subscribe((accounts: Array<Account>) => {
    //     this.accountsList = accounts.map((acc) => {
    //       let username = acc.owner
    //         .toLowerCase()
    //         .split(' ')
    //         .map((name) => name[0])
    //         .join('');
    //       return { ...acc, username: username };
    //     });
    //     console.log('YTOUU', this.accountsList);
    //     this.dummyAccount = this.accountsList[2];
    //     console.log('TIEE', this.dummyAccount);
    //   });
  }

  login(username: string, pin: string): boolean {
    this.loggedinAccount = this.accountsList.find(
      (acc) => acc.username === username && acc.pin === Number(pin)
    );

    console.log('WHOIS', this.loggedinAccount);
    return this.loggedinAccount ? true : false;
  }

  getLoggedinAccount(): Account | undefined {
    // return this.loggedinAccount;
    return this.dummyAccount;
  }
}
