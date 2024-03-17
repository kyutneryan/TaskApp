import React, { FC, memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { IProduct } from '../../models/common';
import { COLORS, QUERY_KEY } from '../../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';
import { ProductItem } from '../molecule';

interface Props {
  category: string;
}

const ProductsList: FC<Props> = ({ category }) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getProductsByCategory, category],
    queryFn: () => ProductService.getProductsByCategory(category, { limit: 4 }),
  });

  const keyExtractor = useCallback((item: IProduct) => item.id.toString(), []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IProduct>) => {
    return <ProductItem product={item} />;
  }, []);

  const renderItemSeparatorComponent = useCallback(() => <View style={styles.divider} />, []);

  const renderListEmptyComponent = useCallback(
    () => (isLoading ? null : <Text style={styles.emptyScreenText}>No data</Text>),
    [isLoading],
  );

  const renderListHeaderComponent = useCallback(
    () =>
      isLoading ? null : (
        <>
          <Text style={styles.headerText}>{category.toUpperCase()}</Text>
          <Text style={styles.seeAll} onPress={() => null}>
            SEE ALL
          </Text>
        </>
      ),
    [category, isLoading],
  );

  return (
    <FlatList
      data={data?.products}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={renderItem}
      ItemSeparatorComponent={renderItemSeparatorComponent}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderListEmptyComponent}
      ListHeaderComponent={renderListHeaderComponent}
      ListHeaderComponentStyle={styles.header}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: { justifyContent: 'space-between', gap: horizontalScale(5) },
  divider: { height: verticalScale(15) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(10),
  },
  headerText: { fontWeight: '500', fontSize: moderateScale(16), lineHeight: moderateScale(19) },
  seeAll: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: moderateScale(12),
    textDecorationLine: 'underline',
  },
  emptyScreenText: {
    paddingTop: verticalScale(40),
    fontWeight: '400',
    lineHeight: verticalScale(19),
    textAlign: 'center',
    color: COLORS.text,
  },
});

export default memo(ProductsList);
