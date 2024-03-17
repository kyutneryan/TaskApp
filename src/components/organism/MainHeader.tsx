import React, { FC, memo, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import Logo from '../../assets/icons/logo/HeaderLogo.svg';
import {
  getProductSearchValue,
  setProductSearchValue,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { HeaderTitle, SearchInput } from '../atom';
import { Header } from '../molecule';

interface Props {
  hasBack?: boolean;
  hasSearch?: boolean;
}

const MainHeader: FC<Props> = ({ hasBack, hasSearch }) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(getProductSearchValue);

  const renderLeftComponent = useCallback((routeName: string) => {
    switch (routeName) {
      case 'HomeScreen':
      case 'Categories':
        return <Logo />;
      case 'WishList':
      case 'Profile':
        return null;
      default:
        return null;
    }
  }, []);

  const renderRightComponent = useCallback((routeName: string) => {
    switch (routeName) {
      case 'HomeScreen':
      case 'Categories':
      case 'WishList':
      case 'Profile':
      default:
        return null;
    }
  }, []);

  const renderCenterComponent = useCallback(
    (routeName: string) => {
      switch (routeName) {
        case 'SearchScreen':
          return (
            <SearchInput
              searchName={searchValue}
              onChange={text => dispatch(setProductSearchValue(text))}
            />
          );
        case 'HomeScreen':
          return null;
        case 'Categories':
        case 'WishList':
        case 'Profile':
          return <HeaderTitle title={routeName} />;
        default:
          return null;
      }
    },
    [dispatch, searchValue],
  );

  return (
    <Header
      hasBack={hasBack}
      hasSearch={hasSearch}
      LeftComponent={renderLeftComponent(route.name)}
      RightComponent={renderRightComponent(route.name)}
      CenterComponent={renderCenterComponent(route.name)}
    />
  );
};

export default memo(MainHeader);
