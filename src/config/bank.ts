export const bankConfig = {
  bankId: process.env.NEXT_PUBLIC_BANK_ID || 'MB',
  accountNo: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO || '',
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || '',
  template: process.env.NEXT_PUBLIC_BANK_TEMPLATE || 'compact2',
};