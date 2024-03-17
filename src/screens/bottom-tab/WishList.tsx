import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Screen } from '../../components/atom';
import { ProductItem } from '../../components/molecule';
import { IProduct } from '../../models/common';
import { getWishLists, useAppSelector } from '../../store';
import { COLORS } from '../../utils/constants';
import { horizontalScale, verticalScale } from '../../utils/scale';

export const WishList = () => {
  const wishList = useAppSelector(getWishLists);
  const ref = useRef(null);

  const keyExtractor = useCallback((item: IProduct) => item.id.toString(), []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IProduct>) => {
    return <ProductItem product={item} />;
  }, []);

  const renderItemSeparatorComponent = useCallback(() => <View style={styles.divider} />, []);

  const renderListEmptyComponent = useCallback(
    () => <Text style={styles.emptyScreenText}>No data</Text>,
    [],
  );

  useScrollToTop(ref);

  return (
    <Screen edges={[]}>
      <FlatList
        ref={ref}
        scrollEnabled
        data={wishList}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
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
  columnWrapper: { justifyContent: 'space-between', gap: horizontalScale(5) },
  divider: { height: verticalScale(15) },
  emptyScreenText: {
    paddingTop: verticalScale(40),
    fontWeight: '400',
    lineHeight: verticalScale(19),
    textAlign: 'center',
    color: COLORS.text,
  },
  list: { paddingVertical: verticalScale(20) },
});
