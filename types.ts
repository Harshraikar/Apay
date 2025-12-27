
export enum AppStep {
  NAME_ENTRY = 'NAME_ENTRY',
  WELCOME = 'WELCOME',
  MERCHANT_SELECTION = 'MERCHANT_SELECTION',
  COURSE_SELECTION = 'COURSE_SELECTION',
  NUMBER_ENTRY = 'NUMBER_ENTRY',
  AMOUNT_ENTRY = 'AMOUNT_ENTRY',
  METHOD_SELECTION = 'METHOD_SELECTION',
  PIN_ENTRY = 'PIN_ENTRY',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export interface UserData {
  name: string;
  phoneNumber: string;
  amount: string;
  currencyType: string;
  paymentMethod: string;
  course?: string;
  merchantName: string;
  merchantId: string;
}
