import React, {useEffect} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CRow} from '@coreui/react'
import {useSelector} from 'react-redux'
import propTypes from 'prop-types'
import {Redirect, Switch, useHistory} from 'react-router-dom'
// import usersData from './UsersData'

const User = ({match}) => {
  const users = useSelector((state) => state.userdata.value)
  const history = useHistory()
  const user = users.find((user) => user.id.toString() === match.params.id)
  const userDetails = () => {
    if (users.length === 0) {
      history.push('/users')
    } else {
      return Object.entries(user)
    }
  }
  useEffect(() => {
    userDetails()
  }, [])
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>User id: {match.params.id}</CCardHeader>
          <CCardBody>
            <Switch>
              {users.length !== 0 ? (
                <table className="table table-striped table-hover">
                  <tbody>
                    {userDetails().map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td>
                            <strong>{value}</strong>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <Redirect to="/users" />
              )}
            </Switch>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

User.propTypes = {
  match: propTypes.object.isRequired,
}

export default User
