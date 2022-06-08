import React from 'react'
import Container from '@mui/material/Container'

const MobileScroll = () => (
  <div style={{ height: '100px', width: '100%' }} />
)

const Layout = ({ children }) => {
  return (
    <Container maxWidth='lg'>
      {children}
      <MobileScroll />
    </Container>
  )
}

export default Layout
