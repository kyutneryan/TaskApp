import { Dimensions } from 'react-native';
import { horizontalScale, verticalScale } from './scale';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export const QUERY_KEY = {
  getMe: 'get-me',
  getCategories: 'get-categories',
  getProducts: 'get-products',
};

export const COLORS = {
  text: '#1E1D1D',
  white: '#fff',
  black: '#000',
  safeArea: '#F5F5F5',
  border: '#E6E6E6',
  red: 'red',
  primary: '#7867BE',
  gray: '#CACACA',
  background: '#F9F9F9',
};

export const HEADER_HEIGHT = verticalScale(48);
export const HORIZONTAL_PADDING = horizontalScale(15);
