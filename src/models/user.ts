interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Hair {
  color: string;
  type: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

interface Crypto {
  coin: string;
  network: string;
  wallet: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  password: string;
  address: Address;
  birthDate: string;
  age: number;
  bank: Bank;
  bloodGroup: string;
  company: Company;
  crypto: Crypto;
  domain: string;
  ein: string;
  eyeColor: string;
  gender: string;
  hair: Hair;
  height: number;
  ip: string;
  macAddress: string;
  maidenName: string;
  phone: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}
