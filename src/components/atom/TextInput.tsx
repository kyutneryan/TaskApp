import React, { forwardRef, memo } from 'react';
import {
  TextInput as Input,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

interface Props extends TextInputProps {
  isRequired?: boolean;
  label?: string;
  hasError?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const TextInput = forwardRef<Input, Props>(
  ({ isRequired, label, hasError = false, wrapperStyle, onLayout, style, ...rest }, ref) => {
    return (
      <View style={styles.base} onLayout={onLayout}>
        {!!label && (
          <Text style={styles.label}>
            {label}
            {isRequired && <Text style={{ color: COLORS.red }}>*</Text>}
          </Text>
        )}
        <View style={[styles.wrapper, hasError && styles.wrapperError, wrapperStyle]}>
          <Input
            ref={ref}
            spellCheck={false}
            style={[styles.input, hasError && styles.inputError, style]}
            {...rest}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
  label: {
    paddingBottom: verticalScale(10),
    fontSize: moderateScale(14),
    fontWeight: '400',
    lineHeight: verticalScale(16),
    color: COLORS.text,
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: verticalScale(52),
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: moderateScale(10),
  },
  wrapperError: {
    borderWidth: 1,
    borderColor: COLORS.red,
    backgroundColor: 'rgba(237,43,43,0.05)',
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: moderateScale(14),
    paddingHorizontal: horizontalScale(15),
    color: COLORS.text,
  },

  inputError: {
    color: COLORS.red,
  },
});

export default memo(TextInput);
