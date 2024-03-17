import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import TextInput from './TextInput';
import Search from '../../assets/icons/SearchGray.svg';
import { horizontalScale, verticalScale } from '../../utils/scale';

interface Props {
  searchName: string;
  onChange: (text: string) => void;
}

const SearchInput: FC<Props> = ({ searchName, onChange }) => {
  return (
    <TextInput
      placeholder="SEARCH"
      placeholderTextColor="#D1D1D1"
      wrapperStyle={styles.wrapperStyle}
      value={searchName}
      onChangeText={onChange}
      Icon={<Search />}
    />
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    paddingHorizontal: horizontalScale(10),
    minHeight: verticalScale(40),
    backgroundColor: '#F4F4F4',
    width: '85%',
    alignSelf: 'flex-end',
    borderWidth: 0,
  },
});

export default memo(SearchInput);
