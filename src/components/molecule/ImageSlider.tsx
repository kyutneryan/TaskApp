import React, { FC, memo, useCallback, useState } from 'react';
import {
  Image,
  ImageStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS, HORIZONTAL_PADDING, WINDOW_WIDTH } from '../../utils/constants';
import { moderateScale, verticalScale } from '../../utils/scale';

interface Props {
  images: string[];
  imageStyle?: StyleProp<ImageStyle>;
}

const ImageSlider: FC<Props> = ({ images, imageStyle }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentPage(Math.round(event.nativeEvent.contentOffset.x / WINDOW_WIDTH));
  }, []);

  return (
    <View style={styles.base}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {images.map((image, idx) => (
          <Image
            key={idx}
            source={typeof image === 'string' ? { uri: image } : image}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentPage ? COLORS.black : COLORS.white },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  image: {
    width: WINDOW_WIDTH - HORIZONTAL_PADDING * 2,
    height: verticalScale(215),
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default memo(ImageSlider);
