import React, { FC, memo } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/constants';
import { moderateScale, verticalScale } from '../../utils/scale';

export interface CustomButton {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Button: FC<CustomButton> = ({ disabled, onPress, style, textStyle, text }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.base, disabled && styles.disabled, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.button,
    borderRadius: moderateScale(10),
  },
  disabled: { opacity: 0.5 },
  text: {
    fontWeight: '400',
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: COLORS.white,
  },
});

export default memo(Button);
