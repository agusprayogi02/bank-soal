import React, {useEffect, useState} from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImg,
  CCol,
  CForm,
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
  CTextarea,
} from '@coreui/react';
import {useDispatch, useSelector} from 'react-redux';
import {getPelajaranByid, postPelajaran} from '../../../features/pelajaran/pelajaranSlice';
import useToken from '../../../app/useToken';
import CIcon from '@coreui/icons-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from '../../../utils';
import {useHistory} from 'react-router';

const Pelajaran = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {token} = useToken();
  const {pelajaran, error} = useSelector((state) => state.pelajaran);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    var target = e.target,
      form = new FormData();
    // console.log(target[2].files[0]);
    form.append('nama', target[0].value);
    form.append('deskripsi', target[1].value);
    form.append('image', target[2].files[0]);
    form.append('uid', token);
    dispatch(postPelajaran(form));
    if (!error) {
      toggle();
    }
  };
  const toggle = () => {
    setModal(!modal);
    setFile(null);
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    document.querySelector('textarea').value = '';
  };
  useEffect(() => {
    dispatch(getPelajaranByid(token));
  }, []);
  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <h4>Mata Pelajaran</h4>
          </CCol>
          <CCol sm={2}>
            <CButton color="primary" onClick={toggle} className="px-4" variant="outline">
              Tambah
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CRow>
          {pelajaran.map((e, i) => {
            return (
              <CCol sm="6" lg="3" key={i}>
                <CCard>
                  {e.gambar != null ? (
                    <CCardImg
                      height={150}
                      variant="full"
                      src={BASE_URL + '/pelajaran/' + e.gambar}
                    />
                  ) : (
                    <CCardBody color="gradient-warning" className="text-center">
                      <CIcon name="cil-calendar" height="52" className="my-4" />
                    </CCardBody>
                  )}
                  <CCardFooter className="text-center">
                    <CLink
                      className="h3 mb-2"
                      onClick={() => history.push('/pelajaran/' + e.kdPelajaran)}>
                      {e.nama}
                    </CLink>
                    <p className="text-dark font-smaller">{e.deskripsi}</p>
                  </CCardFooter>
                </CCard>
              </CCol>
            );
          })}
        </CRow>
        <div>
          <CModal show={modal} onClose={toggle}>
            <CModalHeader closeButton>Tambah Kelas</CModalHeader>
            <CForm method="post" onSubmit={(e) => onSubmit(e)} formEncType="multipart/form-data">
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <FontAwesomeIcon icon={faHome} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text" name="nama" placeholder="Masukkan nama.." required />
                </CInputGroup>
                <CTextarea
                  rows={4}
                  type="text"
                  name="nama"
                  placeholder="Masukkan Deskripsi.."
                  required
                />
                <CRow className="mt-3">
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
      </CCardBody>
    </CCard>
  );
};

export default Pelajaran;
