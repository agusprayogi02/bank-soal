import React, {useEffect} from 'react';
import {TheContent, TheSidebar, TheFooter, TheHeader} from './index';
import {useHistory} from 'react-router-dom';
import useToken from '../app/useToken';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserdata} from '../features/userdata/userdataSlice';

const TheLayout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {error} = useSelector((state) => state.userdata);
  const {token} = useToken();
  const getUser = () => {
    if (token !== '') {
      dispatch(fetchUserdata(token));
      if (error !== null) {
        history.replace('/login');
      }
    } else {
      history.replace('/login');
    }
  };
  useEffect(async () => {
    getUser();
  }, []);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
