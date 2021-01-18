import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination} from '@coreui/react'
import {useSelector} from 'react-redux'

import {fetchUsers} from '../../features/userdata/userdataSlice'
import useUser from '../../app/useUser'
// import usersData from './UsersData'

const Users = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {userdata} = useUser()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const {value} = useSelector((state) => state.userdata)
  const totalPage = Math.floor(value.length / 5)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(async () => {
    currentPage !== page && setPage(currentPage)
    dispatch(fetchUsers(userdata.sekolah.id))
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={value}
              fields={[{key: 'name', _classes: 'font-weight-bold'}, 'email', 'role', 'jk']}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
            />
            {totalPage > 0 && (
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={totalPage}
                doubleArrows={false}
                align="center"
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
