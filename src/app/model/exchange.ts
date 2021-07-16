export interface Exchange {
  id: number;
  originCurrency: string;
  targetCurrency: string;
  rate: number;
  amount: number;
  value: number;
  dataTimeRate: string;
}
