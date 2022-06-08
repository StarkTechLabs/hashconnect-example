import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import theme from './common/theme'

import Header from './components/Header'
import Layout from './components/Layout'
import BusProvider from './components/BusProvider/BusProvider'
import AppProvider from './components/AppProvider/AppProvider'
import HashProvider from './components/HashProvider/HashProvider'

import Home from './views/Home'

const network = 'testnet'
const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BusProvider>
      <AppProvider>
        <HashProvider network='testnet'>
          <Router>
            <Header network={network} />
            <Layout>
              <Routes>
                <Route
                  path='/' exact
                  element={<Home />}
                />
              </Routes>
            </Layout>
          </Router>
        </HashProvider>
      </AppProvider>
    </BusProvider>
  </ThemeProvider>
)

export default AppContainer
