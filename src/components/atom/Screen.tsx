import React, { FC, memo, PropsWithChildren } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../utils/constants';

interface Props {
  edges?: Edge[];
}

const Screen: FC<PropsWithChildren<Props>> = ({ edges, children }) => {
  return (
    <SafeAreaView edges={edges} style={styles.base}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: COLORS.safeArea },
});

export default memo(Screen);
