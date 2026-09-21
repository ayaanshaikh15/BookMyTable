import React from 'react'
import { Outlet } from 'react-router-dom'

function OwnerLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default OwnerLayout;
