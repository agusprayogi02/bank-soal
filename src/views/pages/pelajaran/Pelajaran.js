import React, {useEffect} from 'react'
import {CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow} from '@coreui/react'
import {useDispatch, useSelector} from 'react-redux'
import {getPelajaranByid} from '../../../features/pelajaran/pelajaranSlice'
import useToken from '../../../app/useToken'
import CIcon from '@coreui/icons-react'

const Pelajaran = () => {
  const dispatch = useDispatch()
  const {token} = useToken()
  const {pelajaran} = useSelector((state) => state.pelajaran)
  useEffect(() => {
    dispatch(getPelajaranByid(token))
  }, [])
  return (
    <CCard>
      <CCardHeader>Mata Pelajaran</CCardHeader>
      <CCardBody>
        <CRow>
          {pelajaran.map((e, i) => {
            console.log(e)
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
            )
          })}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Pelajaran
