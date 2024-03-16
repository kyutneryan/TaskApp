import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthService } from '../../api/services';
import Logo from '../../assets/icons/Logo-big.svg';
import { Button, Screen, TextInput } from '../../components/atom';
import { LogInFormData } from '../../models/formData';
import { setIsLoggedIn, setToken, useAppDispatch } from '../../store';
import { COLORS } from '../../utils/constants';
import { moderateScale, verticalScale } from '../../utils/scale';

export const Login = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>({ defaultValues: { username: 'atuny0', password: '9uQFF1Lh' } });

  const insets = useSafeAreaInsets();

  const { mutate } = useMutation<any, { message: string }, LogInFormData>({
    mutationFn: AuthService.login,
    onSuccess: data => {
      dispatch(setToken(data.accessToken));
      dispatch(setIsLoggedIn());
    },
  });

  return (
    <Screen
      edges={['left', 'right', 'bottom']}
      style={{ backgroundColor: COLORS.white, paddingTop: insets.top }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.base}>
        <Text style={styles.title}>LOG IN</Text>
        <View style={styles.logo}>
          <Logo />
        </View>
        <Controller
          name="username"
          control={control}
          rules={{
            required: 'Username is required',
          }}
          render={({ field: { onChange, value, name } }) => (
            <TextInput
              isRequired
              label="Username"
              hasError={!!errors[name]}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <View style={styles.divider} />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
          }}
          render={({ field: { onChange, value, name } }) => (
            <TextInput
              isRequired
              secureTextEntry
              label="Password"
              hasError={!!errors[name]}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </ScrollView>
      <View style={styles.btnWrapper}>
        <Button text="LOG IN" onPress={handleSubmit(data => mutate(data))} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  base: { flex: 1, paddingTop: verticalScale(25) },
  title: {
    fontWeight: '500',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(28),
    textAlign: 'center',
  },
  logo: {
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(35),
    alignItems: 'center',
  },
  btnWrapper: { paddingVertical: verticalScale(5) },
  divider: { height: verticalScale(20) },
});
