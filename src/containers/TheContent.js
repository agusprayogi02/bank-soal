import React, {Suspense, useEffect} from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import {CContainer, CFade} from '@coreui/react'

// routes config
import routes from '../routes'
import {useDispatch, useSelector} from 'react-redux'
import useToken from '../app/useToken'
import {fetchUserdata} from '../features/userdata/userdataSlice'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {error} = useSelector((state) => state.userdata)
  const {token} = useToken()
  const getUser = () => {
    if (token !== '') {
      dispatch(fetchUserdata(token))
      if (error !== null) {
        history.replace('/login')
      }
    } else {
      history.replace('/login')
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
