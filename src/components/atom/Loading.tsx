import React, { FC, memo } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { COLORS } from '../../utils/constants';

interface Props {
  visible: boolean;
}

const Loading: FC<Props> = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: `${COLORS.gray}66`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Loading);
