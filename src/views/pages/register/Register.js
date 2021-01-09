import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {getSekolahAll} from '../../../api/Api'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchRegister, getUserFailure, resetError} from '../../../features/userdata/userdataSlice'
import useToken from '../../../app/useToken'

const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {error, user} = useSelector((state) => state.userdata)
  const {setToken} = useToken()
  const [visible, setVisible] = useState(false)
  const [sekolah, setSekolah] = useState([])
  const onsubmit = (e) => {
    e.preventDefault()
    var err,
      target = e.target
    if (target[3].value !== target[4].value) {
      err = {
        name: 'Error',
        message: 'Password Tidak Sama!!',
      }
      dispatch(getUserFailure(err))
    } else if (target[5].value === '0') {
      err = {
        name: 'Error',
        message: 'Jenis Kelamin Harus diisi!!',
      }
      dispatch(getUserFailure(err))
    } else if (target[6].value === '0') {
      err = {
        name: 'Error',
        message: 'Kelas Harus diisi!!',
      }
      dispatch(getUserFailure(err))
    } else {
      var user = {
        firstName: target[0].value,
        lastName: target[1].value,
        email: target[2].value,
        password: target[3].value,
        jk: target[5].value,
        role: 'guru',
      }
      dispatch(fetchRegister(user, target[6].value))
    }
  }
  const syncron = () => {
    if (user.uid !== undefined) {
      setToken(String(user.uid))
      history.push('/')
    } else {
      setTimeout(() => {
        dispatch(resetError())
      }, 3000)
    }
  }

  useEffect(() => {
    getSekolahAll().then((res) => {
      setSekolah(res)
    })
    syncron()
    return () => {
      setSekolah([])
    }
  }, [user, error])
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onsubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CRow>
                    <CCol xl="6" lg="6">
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="FistName"
                          autoComplete="FistName"
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xl="6" lg="6">
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="LastName"
                          autoComplete="LastName"
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" placeholder="Email" autoComplete="email" required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type={visible ? 'text' : 'password'}
                      placeholder="Password"
                      autoComplete="new-password"
                      required
                    />
                    <CInputGroupAppend>
                      <CInputGroupText onClick={() => setVisible(!visible)}>
                        <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type={visible ? 'text' : 'password'}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-history" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      custom
                      name="jk"
                      id="jk"
                      placeholder="Pilih"
                      autoComplete="name"
                      required>
                      <option value="0">Please select Jenis Kelamin</option>
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </CSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-school" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      custom
                      name="kelas"
                      id="kelas"
                      placeholder="Pilih Kelas"
                      autoComplete="name"
                      required>
                      <option value="0">Please select Kelas</option>
                      {sekolah.map((v, i) => (
                        <option key={'key' + i} value={v.id}>
                          {v.nama} - {v.kelas} {v.jurusan}
                        </option>
                      ))}
                    </CSelect>
                  </CInputGroup>
                  <CButton color="success" type="submit" block>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton
                      className="btn-facebook mb-1"
                      block
                      onClick={() => history.replace('/login')}>
                      <span>Back</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
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
    </div>
  )
}

export default Register
