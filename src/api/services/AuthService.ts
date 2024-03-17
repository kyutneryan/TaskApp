import $apiClient from '..';
import { LogInFormData, LoginResModel } from '../../models/formData';

export class AuthService {
  static login(data: LogInFormData) {
    return $apiClient.post<LoginResModel>('/auth/login', {
      ...data,
      expiresInMins: 3600,
    });
  }
}
