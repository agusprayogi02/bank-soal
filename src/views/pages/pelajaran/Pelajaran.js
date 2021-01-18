import React, {useEffect} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow} from '@coreui/react'
import {useDispatch, useSelector} from 'react-redux'

const Pelajaran = () => {
  const dispatch = useDispatch()
  const {pelajaran} = useSelector((state) => state.pelajaran)
  useEffect(() => {
    dispatch()
  }, [])
  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>List Pelajaran</CCardHeader>
          <CCardBody>
            <CDataTable
              items={pelajaran}
              fields={[{key: 'name', _classes: 'font-weight-bold'}, 'email', 'role', 'jk']}
              hover
              striped
              // itemsPerPage={5}
              // activePage={page}
              clickableRows
              // onRowClick={(item) => history.push(`/users/${item.id}`)}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Pelajaran
