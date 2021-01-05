import React from 'react'
import {CFooter} from '@coreui/react'

const TheFooter = () => {
  var date = new Date()
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Bank Soal
        </a>
        <span className="ml-1">&copy; {date.getFullYear()}</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://agusprayogi02.github.io/" target="_blank" rel="noopener noreferrer">
          Agus Prayogi
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
