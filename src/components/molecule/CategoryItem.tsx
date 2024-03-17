import React, { FC, memo } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ICategory } from '../../models/common';
import { MainNavigatorProp } from '../../navigation/MainNavigation';
import { COLORS } from '../../utils/constants';
import { moderateScale, verticalScale } from '../../utils/scale';

interface Props {
  category: ICategory;
}

const CategoryItem: FC<Props> = ({ category }) => {
  const navigation = useNavigation<MainNavigatorProp>();
  return (
    <Pressable
      style={styles.flex}
      onPress={() => navigation.navigate('ProductsByCategory', { category: category.id })}>
      <ImageBackground source={category.image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>{category.name}</Text>
      </ImageBackground>
    </Pressable>
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
