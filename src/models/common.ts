import { ImageSourcePropType } from 'react-native';

export type Maybe<T> = T | null;

export interface ICategory {
  id: string;
  name: string;
  image?: ImageSourcePropType;
}

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface IProducts {
  limit: number;
  total: number;
  skip: number;
  products: Array<IProduct>;
}
