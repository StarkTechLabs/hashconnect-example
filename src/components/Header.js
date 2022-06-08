import React from 'react'
import { Link as RLink } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

import makeStyles from '@mui/styles/makeStyles'
import CreditCard from '@mui/icons-material/CreditCard'

import { useHashConnect } from './HashProvider/HashProvider'

import useEventBus from '../hooks/useEventBus/useEventBus'

import strings from '../common/strings'
import { ConnectStatus } from '../common/connect'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    borderBottom: '1px solid lightgrey'
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none'
  },
  account: {
    margin: theme.spacing(0, 1),
    color: 'white',
    textDecoration: 'none'
  },
  iconWrapper: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11
  }
}))

const Header = ({ network }) => {
  const classes = useStyles()
  const bus = useEventBus()

  const { status, saveData, instance } = useHashConnect()

  window.instance = instance
  window.saveData = saveData

  const handleConnect = async () => {
    if (instance.availableExtensions && instance.availableExtensions.length) {
      const result = await instance.connectToExtension(instance.availableExtensions[0])
      console.log('connect result', result)
      return
    }

    bus.emit('show-error-notification', { message: <>Could not find HashPack wallet extension. Please <Link href='https://hashpack.app' target='_blank' rel='noreferrer'>go install the extension</Link>.</> })
  }

  const handleUnpair = () => {
    instance.clearPairings()
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <IconButton aria-label='search' className={classes.iconWrapper} component={RLink} to='/'>
            <CreditCard color='secondary' />
          </IconButton>
          <Typography
            variant='h6' noWrap
            className={classes.title}
            component={RLink} to='/'
          >
            {strings.title} - {network}
          </Typography>
          {status === ConnectStatus.PAIRED && <span className={classes.account}>{instance.accountId}</span>}
          {status === ConnectStatus.CONNECTED && <Button color='secondary' onClick={handleConnect}>Connect Wallet</Button>}
          {status === ConnectStatus.PAIRED && <Button color='secondary' onClick={handleUnpair}>Disconnect Wallet</Button>}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
