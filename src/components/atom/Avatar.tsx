import React, { FC, memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { moderateScale } from '../../utils/scale';

interface Props {
  imageUrl: string;
  photoSize?: number;
  onPress?: () => void;
}

const Avatar: FC<Props> = ({ imageUrl, photoSize = 60, onPress }) => {
  return (
    <Pressable style={styles.base} onPress={onPress}>
      <View
        style={[
          styles.imageContainer,
          {
            width: moderateScale(photoSize),
            height: moderateScale(photoSize),
            borderRadius: moderateScale(photoSize) / 2,
          },
        ]}>
        <Image source={{ uri: imageUrl }} style={styles.image} onError={console.error} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  base: {
    justifyContent: 'flex-start',
  },
  imageContainer: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
});

export default memo(Avatar);
