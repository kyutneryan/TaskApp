import $apiClient from '..';
import { IProduct } from '../../models/common';

export class ProductService {
  static getCategories() {
    return $apiClient.get<Array<string>>('/products/categories');
  }
  static getProducts() {
    return $apiClient.get<
      Array<{
        limit: number;
        total: number;
        skip: number;
        products: Array<IProduct>;
      }>
    >('/products');
  }
  static getProductsByCategory(catgoryName: string) {
    return $apiClient.get<{
      limit: number;
      total: number;
      skip: number;
      products: Array<IProduct>;
    }>(`/products/category/${catgoryName}`, { params: { limit: 4 } });
  }
}
