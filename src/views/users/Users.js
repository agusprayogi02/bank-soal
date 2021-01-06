import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from '@coreui/react'
import {useSelector} from 'react-redux'

import {fetchUsers} from '../../features/userdata/userdataSlice'
// import usersData from './UsersData'

const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const {value, user} = useSelector((state) => state.userdata)
  const totalPage = Math.floor(value.length / 5)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    console.log(user.sekolah.id)
    dispatch(fetchUsers(user.sekolah.id))
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={value}
              fields={[{key: 'name', _classes: 'font-weight-bold'}, 'email', 'role']}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status:
                  // eslint-disable-next-line react/display-name
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                    </td>
                  ),
              }}
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
