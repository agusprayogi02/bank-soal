import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImg,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CImg,
  CInput,
  CInputFile,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSpinner,
  CTextarea,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {createKuis, getKuis, getKuisFailure} from '../../../features/kuis';
import {getApiPelajaranId} from '../../../api/pelajaranApi';
import {BASE_URL} from '../../../utils';
import CIcon from '@coreui/icons-react';
import {useHistory} from 'react-router';

const PelajaranItem = ({match}) => {
  var id = match.params.id;
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const [pelajaran, setPelajaran] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const {kuis, isLoading, error} = useSelector((state) => state.kuis);
  const getPelajaran = async () => {
    try {
      var data = await getApiPelajaranId(id);
      setPelajaran(data);
    } catch (error) {
      dispatch(getKuisFailure(error));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    var target = e.target,
      form = new FormData();
    // console.log(target[2].value);
    form.append('nama', target[0].value);
    form.append('deskripsi', target[1].value);
    form.append('tenggat', target[2].value);
    form.append('image', target[3].files[0]);
    form.append('kd', id);
    dispatch(createKuis(form));
    toggle();
  };
  const toggle = () => {
    setModal(!modal);
    setFile(null);
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    document.querySelector('textarea').value = '';
  };
  useEffect(() => {
    dispatch(getKuis(id));
    getPelajaran();
  }, []);
  return isLoading ? (
    <div className="d-flex align-items-center">
      <CSpinner color="primary" style={{width: '4rem', height: '4rem'}} />
    </div>
  ) : (
    <CCard>
      <CCardHeader>
        <CRow>
          <h4 className="col">Pelajaran {pelajaran.nama}</h4>
          <CCol md={2} className="text-center">
            <CButton variant="outline" color="info" onClick={() => toggle()} className="px-4">
              Tambah
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        {kuis.map((dt, i) => {
          return (
            <CCol sm="6" lg="3" key={i}>
              <CCard>
                {dt.gambar != null ? (
                  <CCardImg height={150} variant="full" src={BASE_URL + '/kuis/' + dt.gambar} />
                ) : (
                  <CCardBody color="gradient-warning" className="text-center">
                    <CIcon name="cil-school" height="64" className="my-4" />
                  </CCardBody>
                )}
                <CCardBody className="text-center">
                  <CLink
                    className="h3"
                    onClick={() =>
                      history.push('/pelajaran/' + pelajaran.kdPelajaran + '/' + dt.kd)
                    }>
                    {dt.nama}
                  </CLink>
                </CCardBody>
                <CCardFooter>
                  <CAlert color="primary" className="p-1 text-center m-1">
                    {dt.kd}
                  </CAlert>
                </CCardFooter>
              </CCard>
            </CCol>
          );
        })}
      </CCardBody>
      <CCardFooter>Kode Pelajaran: {pelajaran.kdPelajaran}</CCardFooter>
      {error !== null && (
        <CToaster position="top-center">
          <CToast show={true} style={{color: 'red'}} autohide={5000} fade={true}>
            <CToastHeader
              color="red"
              style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold'}}>
              {error.name}
            </CToastHeader>
            <CToastBody color="blue">{error.message ?? error.error}</CToastBody>
          </CToast>
        </CToaster>
      )}
      <div>
        <CModal show={modal} onClose={toggle}>
          <CModalHeader closeButton>Tambah Kuis</CModalHeader>
          <CForm method="post" onSubmit={(e) => onSubmit(e)} formEncType="multipart/form-data">
            <CModalBody>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <FontAwesomeIcon icon={faGamepad} />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput type="text" placeholder="Masukkan Nama Kuis.." required />
              </CInputGroup>
              <CTextarea rows={4} type="text" placeholder="Masukkan Penjelasan kuis" required />
              <CFormGroup>
                <CInput type="datetime-local" name="tenggat" className="mt-3" required />
                <CFormText className="help-block text-danger">Masukkan Tenggat Tugas!</CFormText>
              </CFormGroup>
              <CRow>
                {file != null && (
                  <CCol sm="4">
                    <CImg src={URL.createObjectURL(file)} thumbnail />
                  </CCol>
                )}
                <CCol>
                  <div className="custom-file">
                    <CInputFile
                      placeholder="File"
                      name="file"
                      id="file"
                      className="custom-file-input"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <CLabel className="custom-file-label" htmlFor="file">
                      {file ? file.name : 'Pilih File'}
                    </CLabel>
                  </div>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" color="primary">
                Submit
              </CButton>
              <CButton color="secondary" onClick={toggle}>
                Cancel
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </div>
    </CCard>
  );
};

PelajaranItem.propTypes = {
  match: propTypes.object.isRequired,
};

export default PelajaranItem;
