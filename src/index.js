import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './App'

if (typeof window !== 'undefined') {
  window.onload = () => {
    ReactDOM.render(<AppContainer />, document.getElementById('main'))
  }
}
