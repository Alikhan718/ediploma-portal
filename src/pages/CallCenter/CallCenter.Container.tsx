import React from 'react';

import { fetchCallCenterLocations, fetchCallCenterOrders } from '@src/store/callcenter/actionCreators';
import { useDispatch } from 'react-redux';
import { CallCenterLayout } from './CallCenter.Layout';

const CallCenterContainer: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(fetchCallCenterOrders());
    }, 7000);
    dispatch(fetchCallCenterOrders());
    dispatch(fetchCallCenterLocations());
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <CallCenterLayout />
  );
};

export default CallCenterContainer;