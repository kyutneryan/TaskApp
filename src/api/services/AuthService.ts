import $apiClient from '..';
import { LogInFormData, LoginResModel } from '../../models/formData';

export class AuthService {
  static login(data: LogInFormData): Promise<LoginResModel> {
    return $apiClient.post('/auth/login', {
      ...data,
      expiresInMins: 3600,
    });
  }
}
