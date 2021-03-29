import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {getApiPelajaranId} from '../../../api/pelajaranApi';
import {CCard, CCardBody, CCardFooter, CCardHeader} from '@coreui/react';

const PelajaranItem = ({match}) => {
  var id = match.params.id;
  const [pelajaran, setPelajaran] = useState({});
  const getPelajaran = async () => {
    try {
      var data = await getApiPelajaranId(id);
      setPelajaran(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPelajaran();
  }, []);
  return (
    <CCard>
      <CCardHeader className="h4">Pelajaran {pelajaran.nama}</CCardHeader>
      <CCardBody></CCardBody>
      <CCardFooter>Kode kelas: {pelajaran.kdPelajaran}</CCardFooter>
    </CCard>
  );
};

PelajaranItem.propTypes = {
  match: propTypes.object.isRequired,
};

export default PelajaranItem;
