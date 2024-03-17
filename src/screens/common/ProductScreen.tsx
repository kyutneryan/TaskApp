import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { Loading, Screen } from '../../components/atom';
import { MainNavigatorProp, MainStackParams } from '../../navigation/MainNavigation';
import { QUERY_KEY } from '../../utils/constants';
import { verticalScale } from '../../utils/scale';

export const ProductScreen = () => {
  const route = useRoute<RouteProp<MainStackParams, 'ProductScreen'>>();
  const navigation = useNavigation<MainNavigatorProp>();
  const { id } = route.params || {};

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.getProductById, id],
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      navigation.goBack();
    }
  }, [isError, navigation]);

  return (
    <Screen edges={['bottom', 'left', 'right']}>
      <Loading visible={isLoading} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  style: { paddingVertical: verticalScale(20) },
});
