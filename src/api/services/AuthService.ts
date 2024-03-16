import $apiClient from '..';
import { LogInFormData } from '../../models/formData';

export class AuthService {
  static async login(data: LogInFormData) {
    return $apiClient.post('/auth/login', data);
  }
}
