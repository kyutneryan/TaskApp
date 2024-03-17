import React, { FC, memo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ICategory } from '../../models/common';
import { COLORS } from '../../utils/constants';
import { moderateScale, verticalScale } from '../../utils/scale';

interface Props {
  category: ICategory;
}

const CategoryItem: FC<Props> = ({ category }) => {
  return (
    <View style={styles.flex}>
      <ImageBackground source={category.image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>{category.name}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  image: {
    overflow: 'hidden',
    height: verticalScale(130),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(19),
    color: COLORS.white,
  },
});

export default memo(CategoryItem);
