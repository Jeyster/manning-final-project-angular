export interface User {
  id?: number;
  login: string;
  password: any;
  salt: any;
  email: string;
  rank: number;
  token: string;
}
