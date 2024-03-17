import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../utils/constants';
import { moderateScale } from '../../utils/scale';

interface HeaderTitle {
  title: string;
}

const HeaderTitle: FC<HeaderTitle> = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(19),
    color: COLORS.text,
    textTransform: 'uppercase',
  },
});

export default memo(HeaderTitle);
