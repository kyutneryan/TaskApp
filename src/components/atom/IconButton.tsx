import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { moderateScale } from '../../utils/scale';

interface Props extends TouchableOpacityProps {
  Icon: JSX.Element;
}

const IconButton: FC<Props> = ({ Icon, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      style={[styles.base, rest.disabled && styles.disabled, rest.style]}>
      {Icon}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  base: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: { opacity: 0.4 },
});

export default memo(IconButton);
