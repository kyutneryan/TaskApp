import banner1 from '../assets/banner/banner1.jpg';
import banner2 from '../assets/banner/banner2.jpg';
import banner3 from '../assets/banner/banner3.jpg';
import automotive from '../assets/images/automotive.jpg';
import fragrances from '../assets/images/fragrances.jpg';
import furniture from '../assets/images/furniture.jpg';
import groceries from '../assets/images/groceries.jpg';
import homeDecoration from '../assets/images/home-decoration.jpg';
import laptops from '../assets/images/laptops.jpg';
import lighting from '../assets/images/lighting.jpg';
import mensShirts from '../assets/images/mens-shirts.jpg';
import mensShoes from '../assets/images/mens-shoes.jpg';
import mensWatches from '../assets/images/mens-watches.jpg';
import motorcycle from '../assets/images/motorcycle.jpg';
import skincare from '../assets/images/skincare.jpg';
import smartphones from '../assets/images/smartphones.jpg';
import sunglasses from '../assets/images/sunglasses.jpg';
import tops from '../assets/images/tops.jpg';
import womensBags from '../assets/images/womens-bags.jpg';
import womensDresses from '../assets/images/womens-dresses.jpg';
import womensJewellery from '../assets/images/womens-jewellery.jpg';
import womensShoes from '../assets/images/womens-shoes.jpg';
import womensWatches from '../assets/images/womens-watches.jpg';

const categoriesWithImage = [
  { key: 'smartphones', image: smartphones },
  { key: 'laptops', image: laptops },
  { key: 'fragrances', image: fragrances },
  { key: 'skincare', image: skincare },
  { key: 'groceries', image: groceries },
  { key: 'home-decoration', image: homeDecoration },
  { key: 'furniture', image: furniture },
  { key: 'tops', image: tops },
  { key: 'womens-dresses', image: womensDresses },
  { key: 'womens-shoes', image: womensShoes },
  { key: 'mens-shirts', image: mensShirts },
  { key: 'mens-shoes', image: mensShoes },
  { key: 'mens-watches', image: mensWatches },
  { key: 'womens-watches', image: womensWatches },
  { key: 'womens-bags', image: womensBags },
  { key: 'womens-jewellery', image: womensJewellery },
  { key: 'sunglasses', image: sunglasses },
  { key: 'automotive', image: automotive },
  { key: 'motorcycle', image: motorcycle },
  { key: 'lighting', image: lighting },
];

export const banners = [
  { id: 1, banner: banner1 },
  { id: 2, banner: banner2 },
  { id: 3, banner: banner3 },
];

export const transformCategoriesData = (data: Array<string>) => {
  return data.map(el => {
    return {
      id: el,
      name: el.toUpperCase(),
      image: categoriesWithImage.find(({ key }) => el === key)?.image,
    };
  });
};
