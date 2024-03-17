import $apiClient from '..';
import { IProducts } from '../../models/common';

export class ProductService {
  static getCategories() {
    return $apiClient.get<Array<string>>('/products/categories');
  }
  static getProducts({ limit, skip }: { limit: number; skip: number }) {
    return $apiClient.get<IProducts[]>('/products', { params: { limit, skip } });
  }
  static getProductsByCategory(catgoryName: string, params: { limit: number }) {
    return $apiClient.get<IProducts>(`/products/category/${catgoryName}`, { params });
  }
}
