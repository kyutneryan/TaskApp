import React, { FC, memo } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../../assets/icons/ArrowBlackLeft.svg';
import SearchBlackIcon from '../../assets/icons/SearchBlackIcon.svg';
import { Maybe } from '../../models/common';
import { MainNavigatorProp } from '../../navigation/MainNavigation';
import { COLORS, HEADER_HEIGHT } from '../../utils/constants';
import { horizontalScale } from '../../utils/scale';
import { IconButton } from '../atom';

interface Props {
  hasBack?: boolean;
  hasSearch?: boolean;
  RightComponent: Maybe<JSX.Element>;
  LeftComponent: Maybe<JSX.Element>;
  CenterComponent: Maybe<JSX.Element>;
}

const Header: FC<Props> = ({
  RightComponent = null,
  LeftComponent = null,
  hasBack = true,
  hasSearch = true,
  CenterComponent = null,
}) => {
  const navigation = useNavigation<MainNavigatorProp>();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.base}>
        <View style={styles.left}>
          {hasBack ? (
            <View style={styles.iconWrapper}>
              <IconButton Icon={<BackIcon />} onPress={navigation.goBack} />
            </View>
          ) : (
            LeftComponent
          )}
        </View>
        {CenterComponent}
        <View style={styles.right}>
          {hasSearch ? (
            <View style={styles.iconWrapper}>
              <IconButton
                Icon={<SearchBlackIcon />}
                onPress={() => navigation.navigate('SearchPage')}
              />
            </View>
          ) : (
            RightComponent
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
  },
  base: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
  },
  iconWrapper: {
    height: '100%',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  left: {
    flex: 1,
  },
});

export default memo(Header);
