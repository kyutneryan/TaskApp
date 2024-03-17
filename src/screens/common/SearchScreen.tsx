import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { Loading, RefreshControl, Screen } from '../../components/atom';
import { ProductItem } from '../../components/molecule';
import useDebounce from '../../hooks/useDebounce';
import { IProduct, IProducts } from '../../models/common';
import { getProductSearchValue, useAppSelector } from '../../store';
import { COLORS, ITEMS_PER_PAGE, QUERY_KEY } from '../../utils/constants';
import { horizontalScale, verticalScale } from '../../utils/scale';

export const SearchScreen = () => {
  const searchName = useAppSelector(getProductSearchValue);
  const debouncedSearchName = useDebounce(searchName, 300);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<IProducts[], Error>({
      initialPageParam: 0,
      queryKey: [QUERY_KEY.getProducts, debouncedSearchName],
      queryFn: ({ pageParam }) =>
        ProductService.getProducts({
          skip: pageParam as number,
          limit: ITEMS_PER_PAGE,
          searchName: debouncedSearchName,
        }),
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
    () => (isLoading ? <Loading visible /> : <Text style={styles.emptyScreenText}>No data</Text>),
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
        keyboardDismissMode="on-drag"
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
    textAlign: 'center',
  },
});
