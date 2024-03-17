import React, { FC, memo, useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { COLORS } from '../../utils/constants';

interface Props {
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}

const RefreshControlComponent: FC<Props> = ({ refetch }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  return (
    <RefreshControl
      tintColor={`${COLORS.primary}80`}
      colors={[COLORS.primary]}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default memo(RefreshControlComponent);
