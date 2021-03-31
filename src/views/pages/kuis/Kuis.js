import {CCard, CCardBody, CCardFooter, CCardHeader} from '@coreui/react';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import propTypes from 'prop-types';
import {getKuisOneApi} from '../../../api/kuisApi';
import {getKuisFailure} from '../../../features/kuis';

const KuisPage = ({match}) => {
  const dispatch = useDispatch(),
    kd = match.params.kd;
  console.log(kd);
  const [kuis, setKuis] = useState({});
  const getKuis = async () => {
    try {
      const kuises = await getKuisOneApi(kd);
      setKuis(kuises);
    } catch (error) {
      dispatch(getKuisFailure(error));
    }
  };
  useEffect(() => {
    getKuis();
  }, []);
  return (
    <CCard>
      <CCardHeader className="h4">Kuis {kuis.nama}</CCardHeader>
      <CCardBody></CCardBody>
      <CCardFooter>Kode Kuis : {kuis.kd}</CCardFooter>
    </CCard>
  );
};

KuisPage.propTypes = {
  match: propTypes.object.isRequired,
};

export default KuisPage;
