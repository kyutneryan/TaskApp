export interface LogInFormData {
  username: string;
  password: string;
}

export interface LoginResModel {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
