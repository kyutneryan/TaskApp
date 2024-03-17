import $apiClient from '..';
import { IUser } from '../../models/user';

export class UserService {
  static getMe() {
    return $apiClient.get<IUser>('/auth/me');
  }
}
