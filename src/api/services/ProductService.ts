import $apiClient from '..';
import { IProduct, IProducts } from '../../models/common';

export class ProductService {
  static getCategories() {
    return $apiClient.get<Array<string>>('/products/categories');
  }
  static getProducts({
    limit,
    skip,
    searchName,
  }: {
    limit: number;
    skip: number;
    searchName: string;
  }) {
    const path = searchName ? '/products/search' : '/products';
    return $apiClient.get<IProducts[]>(path, { params: { limit, skip, q: searchName } });
  }
  static getProductsByCategory(catgoryName: string, params: { limit: number }) {
    return $apiClient.get<IProducts>(`/products/category/${catgoryName}`, { params });
  }
  static getProductById(id: number) {
    return $apiClient.get<IProduct>(`/products/${id}`);
  }
}
