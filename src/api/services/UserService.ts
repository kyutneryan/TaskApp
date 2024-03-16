import $apiClient from '..';

export class UserService {
  static async getMe() {
    return $apiClient.get<any>('/auth/me');
  }
}
