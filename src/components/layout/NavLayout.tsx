import React, { useState } from 'react'
import Nav from '../Nav'
import { Outlet } from 'react-router-dom'

const NavLayout = () => {
    const [searchValue, setSearchValue] = useState('')
  return (
    <>
    <Nav setSearchValue={setSearchValue}/>
    <Outlet/>
    </>
  )
}

export default NavLayout
