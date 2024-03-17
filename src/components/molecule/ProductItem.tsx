import React, { FC, memo, useCallback, useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import HeartIcon from '../../assets/icons/Heart.svg';
import StarIcon from '../../assets/icons/Star.svg';
import RedHeartIcon from '../../assets/icons/Wishlist.svg';
import { IProduct } from '../../models/common';
import {
  addToWishList,
  getWishLists,
  removeFromWishList,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { COLORS } from '../../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';
import { IconButton } from '../atom';

interface Props {
  product: IProduct;
}

const ProductItem: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector(getWishLists);
  const isExist = useMemo(
    () => !!wishList.find(({ id }) => id === product.id),
    [product.id, wishList],
  );

  const handleChangeWishList = useCallback(() => {
    if (isExist) {
      dispatch(removeFromWishList(product));
    } else {
      dispatch(addToWishList(product));
    }
  }, [dispatch, isExist, product]);

  return (
    <View style={styles.base}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={{ uri: product.thumbnail }}
          resizeMode="cover"
          style={styles.image}>
          <IconButton
            Icon={isExist ? <RedHeartIcon /> : <HeartIcon />}
            onPress={handleChangeWishList}
          />
        </ImageBackground>
      </View>
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.footer}>
        <View style={styles.rating}>
          <StarIcon />
          <Text style={styles.title}>{product.rating}</Text>
        </View>
        <Text style={styles.price}>{product.price}$</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: { width: moderateScale(164) },
  imageWrapper: {
    backgroundColor: COLORS.gray,
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: verticalScale(5),
  },
  image: {
    height: moderateScale(164),

    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '400',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalScale(5),
  },
  rating: {
    flexDirection: 'row',
    gap: horizontalScale(2),
  },
  price: {
    fontWeight: '500',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
  },
});

export default memo(ProductItem);
