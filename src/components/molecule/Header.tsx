import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../../assets/icons/ArrowBlackBack.svg';
import SearchBlackIcon from '../../assets/icons/SearchBlackIcon.svg';
import { HEADER_HEIGHT } from '../../utils/constants';
import { horizontalScale } from '../../utils/scale';
import { IconButton } from '../atom';

interface Props {
  hasBack?: boolean;
  hasSearch?: boolean;
  RightComponent?: JSX.Element;
  LeftComponent?: JSX.Element;
  CenterComponent?: JSX.Element;
}

const Header: FC<Props> = ({
  RightComponent,
  LeftComponent,
  hasBack = true,
  hasSearch = true,
  CenterComponent = null,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.base}>
        {hasBack ? (
          <View style={styles.iconWrapper}>
            <IconButton Icon={<BackIcon />} onPress={navigation.goBack} />
          </View>
        ) : (
          LeftComponent
        )}
        {CenterComponent}
        {hasSearch ? (
          <View style={styles.iconWrapper}>
            <IconButton Icon={<SearchBlackIcon />} onPress={() => {}} />
          </View>
        ) : (
          RightComponent
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(20),
  },
  iconWrapper: {
    height: '100%',
    width: horizontalScale(48),
    justifyContent: 'center',
  },
});

export default memo(Header);
