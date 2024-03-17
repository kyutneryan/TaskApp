import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { Loading, RefreshControl, Screen } from '../../components/atom';
import { CategoryItem } from '../../components/molecule';
import { ICategory } from '../../models/common';
import { COLORS, QUERY_KEY } from '../../utils/constants';
import { transformCategoriesData } from '../../utils/helpers';
import { verticalScale } from '../../utils/scale';

export const Categories = () => {
  const ref = useRef(null);
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.getCategories],
    queryFn: ProductService.getCategories,
    select: transformCategoriesData,
  });

  const keyExtractor = useCallback((item: ICategory) => item.id.toString(), []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ICategory>) => {
    return <CategoryItem category={item} />;
  }, []);

  const renderItemSeparatorComponent = useCallback(() => <View style={styles.divider} />, []);

  const renderListEmptyComponent = useCallback(
    () => (isLoading ? <Loading visible /> : <Text style={styles.emptyScreenText}>No data</Text>),
    [isLoading],
  );

  useScrollToTop(ref);

  return (
    <Screen edges={[]}>
      <FlatList
        ref={ref}
        refreshControl={<RefreshControl refetch={refetch} />}
        data={data}
        contentContainerStyle={styles.flatList}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatList: { paddingVertical: verticalScale(20) },
  divider: { height: verticalScale(15) },
  emptyScreenText: {
    paddingTop: verticalScale(40),
    fontWeight: '400',
    lineHeight: verticalScale(19),
    color: COLORS.text,
  },
});
