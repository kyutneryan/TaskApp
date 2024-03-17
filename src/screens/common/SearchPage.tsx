import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { RefreshControl, Screen } from '../../components/atom';
import { ProductItem } from '../../components/molecule';
import { IProduct, IProducts } from '../../models/common';
import { COLORS, ITEMS_PER_PAGE, QUERY_KEY } from '../../utils/constants';
import { horizontalScale, verticalScale } from '../../utils/scale';

export const SearchPage = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<IProducts[], Error>({
      initialPageParam: 0,
      queryKey: [QUERY_KEY.getProducts],
      queryFn: ({ pageParam }) =>
        ProductService.getProducts({ skip: pageParam as number, limit: ITEMS_PER_PAGE }),
      getNextPageParam: (lastPage: IProducts[], pages) => {
        if (lastPage?.length < ITEMS_PER_PAGE) {
          return false;
        }
        return pages.length * ITEMS_PER_PAGE;
      },
    });

  const items = useMemo(
    () =>
      data?.pages.reduce((prev, curr) => {
        if (curr) {
          return [...prev, ...(curr as unknown as IProducts).products];
        }
        return prev;
      }, [] as IProduct[]),
    [data?.pages],
  );

  const keyExtractor = useCallback((item: IProduct) => item.id.toString(), []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IProduct>) => {
    return <ProductItem product={item} />;
  }, []);

  const renderItemSeparatorComponent = useCallback(() => <View style={styles.divider} />, []);

  const renderListEmptyComponent = useCallback(
    () => (isLoading ? null : <Text style={styles.emptyScreenText}>No data</Text>),
    [isLoading],
  );

  const onEndReached = useCallback(() => {
    hasNextPage && !isFetchingNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Screen edges={['bottom', 'left', 'right']}>
      <FlatList
        refreshControl={<RefreshControl refetch={refetch} />}
        data={items}
        numColumns={2}
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
      />
    </Screen>
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
