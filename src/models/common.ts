import { ImageSourcePropType } from 'react-native';

export type Maybe<T> = T | null;

export interface ICategory {
  id: string;
  name: string;
  image?: ImageSourcePropType;
}
