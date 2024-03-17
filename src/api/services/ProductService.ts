import $apiClient from '..';
import { IProducts } from '../../models/common';

export class ProductService {
  static getCategories() {
    return $apiClient.get<Array<string>>('/products/categories');
  }
  static getProducts() {
    return $apiClient.get<IProducts>('/products');
  }
  static getProductsByCategory(catgoryName: string, params: { limit: number }) {
    return $apiClient.get<IProducts>(`/products/category/${catgoryName}`, { params });
  }
}
