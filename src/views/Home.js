import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import { useHashConnect } from '../components/HashProvider/HashProvider'
import useSubscribe from '../hooks/useSubscribe/useSubscribe'

import strings from '../common/strings'
import { formatCount } from '../common/utils'
import { ConnectStatus } from '../common/connect'

const Home = () => {
  const [error, setError] = useState()
  const [balance, setBalance] = useState()

  const { status, getBalance } = useHashConnect()

  useEffect(() => {
    if (status === ConnectStatus.PAIRED) {
      getBalance().then(res => setBalance(res))
    }
  }, [status])

  useSubscribe('show-error-notification', ({ message }) => setError(message))

  return (
    <Box m={3}>
      <Box m={3}>
        {error && <Alert severity='error'>{error}</Alert>}
      </Box>
      <Typography variant='h1' component='h1'>{strings.title}</Typography>
      <Box m={3} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Typography variant='subtitle1'>Status: {status}</Typography>
        {balance && <Typography variant='subtitle2'>Balance: {formatCount(balance.hbars.toBigNumber().toNumber())} ℏ</Typography>}
        <br />

      </Box>

    </Box>
  )
}

export default Home
