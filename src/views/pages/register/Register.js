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
  const [fist, setFist] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [conpass, setConpass] = useState('')
  const [age, setAge] = useState('')
  const [kelas, setKelas] = useState('')
  const onsubmit = (e) => {
    e.preventDefault()
    if (pass !== conpass) {
      var err = {
        name: 'Error',
        message: 'Password Tidak Sama!!',
      }
      dispatch(getUserFailure(err))
    } else {
      var user = {
        firstName: fist,
        lastName: last,
        email: email,
        password: pass,
        age: age,
        role: 'guru',
      }
      dispatch(fetchRegister(user, kelas))
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
                          value={fist}
                          onChange={(v) => setFist(v.target.value)}
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
                          value={last}
                          onChange={(v) => setLast(v.target.value)}
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
                    <CInput
                      type="email"
                      value={email}
                      onChange={(v) => setEmail(v.target.value)}
                      placeholder="Email"
                      autoComplete="email"
                      required
                    />
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
                      value={pass}
                      onChange={(v) => setPass(v.target.value)}
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
                      value={conpass}
                      onChange={(v) => setConpass(v.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-history" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      autoComplete="age"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-school" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      custom
                      name="disabledSelect"
                      id="disabledSelect"
                      placeholder="Pilih"
                      autoComplete="name"
                      value={kelas}
                      required
                      onChange={(e) => setKelas(e.target.value)}>
                      <option value="0">Please select</option>
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
