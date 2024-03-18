import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import StarIcon from '../../assets/icons/Star.svg';
import { Button, Loading, Screen } from '../../components/atom';
import { ImageSlider } from '../../components/molecule';
import { MainNavigatorProp, MainStackParams } from '../../navigation/MainNavigation';
import { COLORS, QUERY_KEY } from '../../utils/constants';
import { applyDiscount } from '../../utils/helpers';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const ProductScreen = () => {
  const route = useRoute<RouteProp<MainStackParams, 'ProductScreen'>>();
  const navigation = useNavigation<MainNavigatorProp>();
  const { id } = route.params || {};

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.getProductById, id],
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  });

  const price = applyDiscount(data?.price || 0, data?.discountPercentage || 0);

  useEffect(() => {
    if (isError) {
      navigation.goBack();
    }
  }, [isError, navigation]);

  return (
    <Screen edges={['bottom', 'left', 'right']}>
      <Loading visible={isLoading} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <ImageSlider images={data?.images || []} imageStyle={{ height: verticalScale(343) }} />
        <Text style={styles.model}>{data?.title}</Text>
        <Text style={styles.restTexts}>
          <Text style={{ color: COLORS.red, textDecorationLine: 'line-through' }}>{price}$</Text>{' '}
          {data?.price}$
        </Text>
        <View style={styles.row}>
          <Text style={styles.restTexts}>Rating: </Text>
          <StarIcon />
          <Text style={styles.restTexts}>{data?.rating}</Text>
        </View>
        <Text style={styles.restTexts}>ID: {data?.id}</Text>
        <Text style={styles.restTexts}>Brand: {data?.brand}</Text>
        <Text style={styles.restTexts}>Category: {data?.category}</Text>
        <View style={styles.div} />
        <Text style={styles.restTexts}>{data?.description}</Text>
        <View style={styles.div} />
        <View style={styles.footer}>
          <View>
            <Text>Total</Text>
            <Text>{data?.price}</Text>
          </View>
          <Button text="ADD TO CARD" style={styles.btn} />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: verticalScale(20) },
  model: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(19),
    paddingTop: verticalScale(10),
    color: COLORS.text,
  },
  restTexts: {
    fontWeight: '400',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    paddingTop: verticalScale(10),
    color: COLORS.text,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  div: { borderColor: COLORS.border, borderWidth: 0.5, marginVertical: verticalScale(10) },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { borderRadius: horizontalScale(5), paddingHorizontal: horizontalScale(15) },
});
