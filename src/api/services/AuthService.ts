import $apiClient from '..';

export class AuthService {
  static async login(data: any) {
    return $apiClient.post('/auth/login', data);
  }
}
