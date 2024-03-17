import React, { memo } from 'react';
import { Header } from '../molecule';

interface MainHeader {
  hasBack?: boolean;
  hasSearch?: boolean;
}

const MainHeader = ({ hasBack, hasSearch }) => {
  return <Header />;
};

export default memo(MainHeader);
