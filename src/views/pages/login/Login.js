import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CToaster,
  CToast,
  CToastBody,
  CToastHeader,
} from '@coreui/react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {fetchLogin} from '../../../features/userdata/userdataSlice'
import CIcon from '@coreui/icons-react'
import useToken from '../../../app/useToken'

const Login = () => {
  const dispatch = useDispatch()
  const {setToken} = useToken()
  const history = useHistory()
  const {error, user} = useSelector((state) => state.userdata)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onLogin = (e) => {
    e.preventDefault()
    dispatch(fetchLogin(email, password))
  }
  const syncron = () => {
    if (user.uid !== undefined) {
      setToken(String(user.uid))
      history.push('/')
    }
  }
  useEffect(() => {
    syncron()
  }, [user])
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onLogin}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        value={email}
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        value={password}
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
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
            <CToastBody color="blue">{error.message}</CToastBody>
          </CToast>
        </CToaster>
      )}
    </div>
  )
}

export default Login
