import { clearMatchMenuItems } from '@src/store/createMenu/reducer';
import React from 'react';
import { useDispatch } from 'react-redux';


import { MathMenuPageLayout } from './MatchMenuPage.Layout';

const MathMenuPageContainer: React.FC = () => {

  return (
    <MathMenuPageLayout />
  );
};
export default MathMenuPageContainer;