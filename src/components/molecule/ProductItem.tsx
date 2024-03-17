import React, { memo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import ban from '../../assets/banner/banner1.jpg';
import StarIcon from '../../assets/icons/Star.svg';
import { COLORS } from '../../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

const ProductItem = () => {
  return (
    <View style={styles.base}>
      <View style={styles.imageWrapper}>
        <ImageBackground source={ban} resizeMode="cover" style={styles.image}>
          <Text style={styles.title}>{'category.name'}</Text>
        </ImageBackground>
      </View>
      <Text style={styles.title}>{'category.name'}</Text>
      <View style={styles.footer}>
        <View style={styles.rating}>
          <StarIcon />
          <Text style={styles.title}>3.4</Text>
        </View>
        <Text style={styles.price}>500$</Text>
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
    padding: moderateScale(5),
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
