import React, { FC, memo, PropsWithChildren } from 'react';
import { StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, HORIZONTAL_PADDING } from '../../utils/constants';

interface Props {
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}

const Screen: FC<PropsWithChildren<Props>> = ({ edges, children, style }) => {
  return (
    <SafeAreaView edges={edges} style={styles.base}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.child, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: COLORS.safeArea },
  child: { flex: 1, paddingHorizontal: HORIZONTAL_PADDING },
});

export default memo(Screen);
