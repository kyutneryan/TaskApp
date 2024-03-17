import React, { useCallback, useRef, useState } from 'react';
import { ListRenderItemInfo, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { FlatList } from 'react-native-gesture-handler';
import { ProductService } from '../../api/services';
import { Loading, Screen } from '../../components/atom';
import { ImageSlider } from '../../components/molecule';
import { ProductsList } from '../../components/organism';
import { COLORS, QUERY_KEY } from '../../utils/constants';
import { verticalScale } from '../../utils/scale';

export const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const ref = useRef(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.getCategories],
    queryFn: ProductService.getCategories,
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

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => <ProductsList withHeader category={item} />,
    [],
  );

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
        data={data}
        refreshControl={
          <RefreshControl
            tintColor={`${COLORS.primary}80`}
            colors={[COLORS.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={styles.flatList}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={<ImageSlider />}
        ListHeaderComponentStyle={styles.headerStyle}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatList: { paddingVertical: verticalScale(20) },
  headerStyle: { paddingBottom: verticalScale(20) },
  divider: { marginVertical: verticalScale(20), borderTopWidth: 1, borderColor: COLORS.border },
  emptyScreenText: {
    paddingTop: verticalScale(40),
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: verticalScale(19),
    color: COLORS.text,
  },
});
