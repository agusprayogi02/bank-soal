import React, {useEffect, useState} from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CInput,
  CInputFile,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
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

const Pelajaran = () => {
  const dispatch = useDispatch();
  const {token} = useToken();
  const {pelajaran} = useSelector((state) => state.pelajaran);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    var target = e.target,
      form = new FormData();
    console.log(target[2].files[0]);
    form.append('nama', target[0].value);
    form.append('deskripsi', target[1].value);
    form.append('image', target[2].files[0]);
    form.append('uid', token);
    dispatch(postPelajaran(form));
  };
  const toggle = () => {
    setModal(!modal);
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
            console.log(e);
            return (
              <CCol sm="6" lg="3" key={i}>
                <CCard>
                  <CCardBody color="gradient-warning" className="text-center">
                    <CIcon name="cil-calendar" height="52" className="my-4" />
                  </CCardBody>
                  <CCardFooter className="text-center">
                    <h4>
                      <b>{e.nama}</b>
                    </h4>
                    <p className="text-dark">{e.deskripsi}</p>
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
                <div className="custom-file mt-3">
                  <CInputFile
                    placeholder="File"
                    name="file"
                    id="file"
                    className="custom-file-input"
                    onChange={(e) => setFile(e.target.files[0].name)}
                  />
                  <CLabel className="custom-file-label" htmlFor="file">
                    {file ?? 'Pilih File'}
                  </CLabel>
                </div>
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
