import React from 'react';
import { StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../api/services';
import { Screen } from '../../components/atom';
import CustomImageSlider from '../../components/molecule/ImageSlider';
import { ProductsList } from '../../components/organism';
import { COLORS, QUERY_KEY } from '../../utils/constants';
import { verticalScale } from '../../utils/scale';

export const Home = () => {
  const categoriesQuery = useQuery({
    queryKey: [QUERY_KEY.getCategories],
    queryFn: ProductService.getCategories,
  });

  // const keyExtractor = useCallback((item: ICategory) => item.id.toString(), []);

  // const renderItem = useCallback(({ item }: ListRenderItemInfo<ICategory>) => {
  //   return <CategoryItem category={item} />;
  // }, []);

  // const renderItemSeparatorComponent = useCallback(() => <View style={styles.divider} />, []);

  // const renderListEmptyComponent = useCallback(
  //   () => (isLoading ? <Loading visible /> : <Text style={styles.emptyScreenText}>No data</Text>),
  //   [isLoading],
  // );

  // console.log(data?.products[0]);

  return (
    <Screen edges={[]}>
      <CustomImageSlider />
      <ProductsList category="smartphones" />
      {/* <FlatList
        refreshControl={<RefreshControl refetch={refetch} />}
        data={data}
        contentContainerStyle={styles.flatList}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        scrollEventThrottle={16}
        scrollToOverflowEnabled={true}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
      /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatList: { paddingVertical: verticalScale(20) },
  divider: { height: verticalScale(15) },
  emptyScreenText: {
    paddingTop: verticalScale(40),
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: verticalScale(19),
    color: COLORS.text,
  },
});
