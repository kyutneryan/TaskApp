import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { Loading, Screen } from '../../components/atom';
import { CategoryItem } from '../../components/molecule';
import { ICategory } from '../../models/common';
import { COLORS, QUERY_KEY } from '../../utils/constants';
import { transformCategoriesData } from '../../utils/helpers';
import { verticalScale } from '../../utils/scale';

export const Categories = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const ref = useRef(null);
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.getCategories],
    queryFn: ProductService.getCategories,
    select: transformCategoriesData,
  });

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

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
    <Screen>
      <FlatList
        ref={ref}
        refreshControl={
          <RefreshControl
            tintColor={`${COLORS.primary}80`}
            colors={[COLORS.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
