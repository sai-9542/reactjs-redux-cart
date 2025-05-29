import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <>
        <Navbar />
        <main>{ children }</main>
        <footer>© 2025 Your Company</footer>
    </>
  )
}

export default Layout