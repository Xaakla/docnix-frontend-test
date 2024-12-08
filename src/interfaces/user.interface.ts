export interface IUser {
  document: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  birthDate: string;

  number: string;
  holderName: string;
  expirationDate: string;
  securityCode: string;

  score: number;
}
