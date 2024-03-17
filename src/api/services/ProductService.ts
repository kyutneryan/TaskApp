import $apiClient from '..';

export class ProductService {
  static getCategories() {
    return $apiClient.get<Array<string>>('/products/categories');
  }
  static getProducts() {
    return $apiClient.get<Array<any>>('/products');
  }
  static getProductsByCategory(catgoryName: string) {
    return $apiClient.get<Array<any>>(`/products/category/${catgoryName}`);
  }
}
