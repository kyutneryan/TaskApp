import React from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Screen } from '../../components/atom';
import { ProductsList } from '../../components/organism';
import { MainStackParams } from '../../navigation/MainNavigation';
import { verticalScale } from '../../utils/scale';

export const ProductsByCategory = () => {
  const route = useRoute<RouteProp<MainStackParams, 'ProductsByCategory'>>();

  return (
    <Screen edges={['bottom', 'left', 'right']}>
      <ProductsList
        scrollEnabled
        category={route.params.category}
        limit={100}
        style={styles.style}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  style: { paddingVertical: verticalScale(20) },
});
