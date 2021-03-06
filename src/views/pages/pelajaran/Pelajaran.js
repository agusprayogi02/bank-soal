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
  CSpinner,
  CTextarea,
} from '@coreui/react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPelajaranByid,
  postPelajaran,
  putPelajaran,
  removePelajaran,
} from '../../../features/pelajaran/pelajaranSlice';
import useToken from '../../../app/useToken';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {URLIMG_PELAJARAN, Wsocket} from '../../../utils';
import {useHistory} from 'react-router';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';

const Pelajaran = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {token} = useToken();
  const {pelajaran, error, isLoading} = useSelector((state) => state.pelajaran);
  const [modal, setModal] = useState(false);
  const [buat, setBuat] = useState(false);
  const [file, setFile] = useState(null);
  const socket = Wsocket(token);

  const Fire = Swal.mixin({
    showConfirmButton: true,
    showCancelButton: true,
  });
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    var target = e.target,
      form = new FormData();
    // console.log(target[2].files[0]);
    form.append('nama', target[0].value);
    form.append('kdPelajaran', target[1].value);
    form.append('deskripsi', target[2].value);
    form.append('image', target[3].files[0]);
    form.append('uid', token);
    if (buat) {
      dispatch(postPelajaran(form));
      if (!error) {
        Toast.fire({
          icon: 'success',
          title: 'Berhasil menambahkan Pelajaran!',
        });
        toggle();
      }
    } else {
      dispatch(putPelajaran(form));
      if (!error) {
        Toast.fire({
          icon: 'success',
          title: 'Berhasil Mengubah Pelajaran!',
        });
        toggle();
      }
    }
  };
  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setFile(null);
      Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
      document.querySelector('textarea').value = '';
    }
  };
  const onDelete = async (e, data) => {
    e.preventDefault();
    var {isConfirmed} = await Fire.fire({
      icon: 'question',
      title: 'Yakin Ingin hapus Kuis ' + data.nama + '?',
    });
    if (isConfirmed) {
      dispatch(removePelajaran(data.kdPelajaran, token));
    }
  };

  // ketika tombol tambah diklik
  const tambah = () => {
    setBuat(true);
    toggle();
  };
  // ketika tombol update diklik
  const ubah = (data) => {
    setBuat(false);
    console.log(document.querySelectorAll('input'));
    console.log(data);
    Array.from(document.querySelectorAll('input'))[0].value = data.nama;
    Array.from(document.querySelectorAll('input'))[1].value = data.kdPelajaran;
    if (data.gambar != null) {
      setFile(data.gambar);
    }
    document.querySelector('textarea').value = data.deskripsi;
    toggle();
  };
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });
    return () => socket.disconnect();
  }, []);
  useEffect(() => {
    dispatch(getPelajaranByid(token));
  }, []);
  return isLoading ? (
    <CSpinner color="primary" style={{width: '4rem', height: '4rem'}} />
  ) : (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <h4>Mata Pelajaran</h4>
          </CCol>
          <CCol sm={2}>
            <CButton color="primary" onClick={tambah} className="px-4" variant="outline">
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
                  <div className="bg-gradient-info text-center action-top">
                    <CRow>
                      <CCol>
                        <CButton onClick={() => ubah(e)}>
                          <CIcon className="text-white" name="cil-pencil" heigh={24} />
                        </CButton>
                      </CCol>
                      <CCol>
                        <CButton onClick={(event) => onDelete(event, e)}>
                          <CIcon className="text-white" name="cil-trash" heigh={24} />
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                  {e.gambar != null ? (
                    <CCardImg height={150} variant="full" src={URLIMG_PELAJARAN + e.gambar} />
                  ) : (
                    <CCardBody color="gradient-warning" className="text-center">
                      <CIcon name="cil-school" height="64" className="my-4" />
                    </CCardBody>
                  )}
                  <CCardFooter className="text-center">
                    <CLink
                      className="h3"
                      onClick={() => history.push('/pelajaran/' + e.kdPelajaran)}>
                      {e.nama}
                    </CLink>
                    <p className="text-dark font-sm text-justify mb-1 mt-2">{e.deskripsi}</p>
                  </CCardFooter>
                </CCard>
              </CCol>
            );
          })}
        </CRow>
        <div>
          <CModal show={modal} onClose={toggle}>
            <CModalHeader closeButton>{buat ? 'Tambah Kelas' : 'Ubah Kelas'}</CModalHeader>
            <CForm method="post" onSubmit={(e) => onSubmit(e)} formEncType="multipart/form-data">
              <CModalBody>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <FontAwesomeIcon icon={faHome} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text" placeholder="Masukkan nama.." required />
                </CInputGroup>
                <CInput type="hidden" />
                <CTextarea rows={4} type="text" placeholder="Masukkan Deskripsi.." required />
                <CRow className="mt-3">
                  {file != null && (
                    <CCol sm="4">
                      {buat ? (
                        <CImg src={URL.createObjectURL(file)} thumbnail />
                      ) : (
                        <CImg src={URLIMG_PELAJARAN + file} thumbnail />
                      )}
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
                      {buat ? (
                        <CLabel className="custom-file-label" htmlFor="file">
                          {file ? file.name : 'Pilih File'}
                        </CLabel>
                      ) : (
                        <CLabel className="custom-file-label" htmlFor="file">
                          {file ? file : 'Pilih File'}
                        </CLabel>
                      )}
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
