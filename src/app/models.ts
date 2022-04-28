export interface Account {
  owner: string;
  interestRate: number;
  pin: number;
  transactions: Array<Transaction>;
  currency: string;
  locale: string;
  username?: string;
}

interface Transaction {
  amount: number;
  date: string;
}
