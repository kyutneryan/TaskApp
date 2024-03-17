import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { ProductItem } from '../../components/molecule';
import { IProduct } from '../../models/common';
import { COLORS, QUERY_KEY } from '../../utils/constants';
import { horizontalScale, verticalScale } from '../../utils/scale';

export const SearchPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getProducts],
    queryFn: ProductService.getProducts,
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

  return (
    <FlatList
      data={data?.products}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={styles.flatList}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={renderItem}
      ItemSeparatorComponent={renderItemSeparatorComponent}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  flatList: { paddingVertical: verticalScale(20) },
  columnWrapper: { justifyContent: 'space-between', gap: horizontalScale(5) },
  divider: { height: verticalScale(15) },
  emptyScreenText: {
    paddingTop: verticalScale(40),
    fontWeight: '400',
    lineHeight: verticalScale(19),
    color: COLORS.text,
  },
});
