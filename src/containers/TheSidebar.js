import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import {selectBar} from '../features/showbar/showbarSlice'

import CIcon from '@coreui/icons-react'
import {showBar} from '../features/showbar/showbarSlice'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(selectBar)

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch(showBar(val))}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <h3 className="c-sidebar-brand-full" height={35}>
          <CIcon name="cil-school" height={35} style={{marginRight: 8}} />
          <b style={{fontFamily: 'Rasa'}}>BANK</b>
          <b style={{fontFamily: 'Righteous', color: 'lightblue'}}>-SOAL</b>
        </h3>
        <CIcon className="c-sidebar-brand-minimized" name="cil-school" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
