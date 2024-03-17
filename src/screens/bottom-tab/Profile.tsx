import { useCallback } from 'react';
import React, { Pressable, StyleSheet, Text, View } from 'react-native';
import ArrowRightIcon from '../../assets/icons/ArrowGrayRight.svg';
import LogOutIcon from '../../assets/icons/Logout.svg';
import { Screen } from '../../components/atom';
import Avatar from '../../components/atom/Avatar';
import { getMeSelector, logOut, useAppDispatch, useAppSelector } from '../../store';
import { COLORS } from '../../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const Profile = () => {
  const user = useAppSelector(getMeSelector);
  const dispatch = useAppDispatch();

  const handleLogOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <Screen edges={[]} style={styles.base}>
      <View style={styles.flex}>
        <View style={styles.userCard}>
          {user && (
            <>
              <Avatar imageUrl={user.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
                <Text style={styles.gender}>{user.gender}</Text>
              </View>
            </>
          )}
        </View>
      </View>
      <Pressable style={styles.logOut} onPress={handleLogOut}>
        <View style={styles.row}>
          <LogOutIcon />
          <Text style={styles.logOutText}>Log Out</Text>
        </View>
        <ArrowRightIcon />
      </Pressable>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: horizontalScale(5) },
  base: {
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  info: {
    gap: verticalScale(5),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: moderateScale(19),
    letterSpacing: 0,
    color: COLORS.text,
  },
  gender: {
    fontSize: moderateScale(16),
    fontWeight: '300',
    lineHeight: moderateScale(19),
    letterSpacing: 0,
    color: COLORS.gray,
  },
  logOut: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logOutText: {
    fontSize: moderateScale(14),
    fontWeight: '300',
    lineHeight: moderateScale(16),
    color: COLORS.gray,
  },
});
